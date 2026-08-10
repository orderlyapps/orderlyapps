import type {
  AppDatabase,
  AppSettings,
  ImportAppDatabaseResult,
  JsonValue,
  SettingsMap,
} from "./types.ts";

export interface ImportAppSettingsOptions {
  /**
   * When `true`, existing settings are replaced with the imported
   * values. Defaults to `false` (merge over existing values).
   * Defaults seeded by `createAppSettings` are re-seeded for any keys
   * the file doesn't contain, so the app never runs with missing defaults.
   */
  replace?: boolean;
}

export interface ImportAppSettingsResult {
  /** Keys from the file that were written to the store. */
  imported: string[];
  /** Keys from the file that were skipped because they don't exist in this app's store. */
  skipped: string[];
}

function isJsonValue(value: unknown): value is JsonValue {
  if (value === null) return true;
  switch (typeof value) {
    case "boolean":
      return true;
    case "number":
      return Number.isFinite(value);
    case "string":
      return true;
    case "object":
      return Array.isArray(value)
        ? value.every(isJsonValue)
        : Object.values(value).every(isJsonValue);
    default:
      return false;
  }
}

function jsonTypeOf(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

/** Parses and validates a settings JSON string into a `SettingsMap`. */
export function parseAppSettings(json: string): SettingsMap {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Settings file is not valid JSON.");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Settings file must contain a JSON object.");
  }
  for (const [key, value] of Object.entries(parsed)) {
    if (!isJsonValue(value)) {
      throw new Error(`Setting "${key}" contains a value that is not JSON-serialisable.`);
    }
  }
  return parsed as SettingsMap;
}

/**
 * Validates a settings JSON string and writes its values into the store.
 * Only keys that already exist in the store are written; unknown keys are
 * skipped and reported in the result. Values whose JSON type differs from
 * the currently stored value (e.g. a string where a number is stored) are
 * rejected. Note that literal/enum narrowing (e.g. `"light" | "dark"`)
 * cannot be validated at runtime.
 *
 * A stored value of `null` is treated as unset and accepts any imported
 * type.
 *
 * Throws a descriptive `Error` when the file content is invalid, when a
 * value's type conflicts with the stored value, or when no keys apply —
 * in which case the store is left untouched, even with `replace: true`.
 */
export async function importAppSettings<T extends SettingsMap>(
  store: AppSettings<T>,
  json: string,
  options: ImportAppSettingsOptions = {},
): Promise<ImportAppSettingsResult> {
  const data = parseAppSettings(json);
  const existing = (await store.getAll()) as SettingsMap;
  const existingKeys = new Set(Object.keys(existing));
  const known: SettingsMap = {};
  const skipped: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (!existingKeys.has(key)) {
      skipped.push(key);
      continue;
    }
    const current = existing[key];
    if (current != null && jsonTypeOf(current) !== jsonTypeOf(value)) {
      throw new Error(
        `Setting "${key}" has type "${jsonTypeOf(current)}" in this app but the file contains type "${jsonTypeOf(value)}".`,
      );
    }
    known[key] = value;
  }

  const imported = Object.keys(known);
  if (imported.length === 0) {
    throw new Error(
      skipped.length > 0
        ? "None of the settings in the file apply to this app; nothing was imported."
        : "Settings file contains no settings; nothing was imported.",
    );
  }

  if (options.replace) {
    await store.replaceAll(known as Partial<T>);
  } else {
    await store.setMany(known as Partial<T>);
  }
  return { imported, skipped };
}

/**
 * Parses and validates a database-level settings JSON string (produced by
 * `exportAppDatabase`) into a map of document IDs to settings maps.
 *
 * The top-level value must be a JSON object whose values are themselves JSON
 * objects.
 */
export function parseAppDatabase(json: string): Record<string, SettingsMap> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Settings file is not valid JSON.");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Settings file must contain a JSON object.");
  }
  const result: Record<string, SettingsMap> = {};
  for (const [docId, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new Error(`Settings section "${docId}" must contain a JSON object.`);
    }
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (!isJsonValue(val)) {
        throw new Error(
          `Setting "${docId}.${key}" contains a value that is not JSON-serialisable.`,
        );
      }
    }
    result[docId] = value as SettingsMap;
  }
  return result;
}

export interface ImportAppDatabaseOptions {
  /**
   * When `true`, each document's data is replaced with the imported values.
   * Defaults to `false` (merge over existing values).
   */
  replace?: boolean;
}

/**
 * Validates a database-level settings JSON string and writes its values into
 * the shared database. Only document IDs that already exist in the database
 * are written; unknown IDs are skipped and reported in the result.
 *
 * Throws a descriptive `Error` when the file content is invalid or when no
 * documents apply — in which case the database is left untouched.
 */
export async function importAppDatabase(
  database: AppDatabase,
  json: string,
  options: ImportAppDatabaseOptions = {},
): Promise<ImportAppDatabaseResult> {
  const data = parseAppDatabase(json);
  const collection = database.settings;
  const existingDocs = await collection.find().exec();
  const existingIds = new Set(existingDocs.map((d) => d.id));

  const known: Record<string, SettingsMap> = {};
  const skipped: string[] = [];

  for (const [docId, values] of Object.entries(data)) {
    if (!existingIds.has(docId)) {
      skipped.push(docId);
      continue;
    }
    known[docId] = values;
  }

  const imported = Object.keys(known);
  if (imported.length === 0) {
    throw new Error(
      skipped.length > 0
        ? "None of the settings sections in the file apply to this database; nothing was imported."
        : "Settings file contains no settings sections; nothing was imported.",
    );
  }

  for (const [docId, values] of Object.entries(known)) {
    const doc = existingDocs.find((d) => d.id === docId)!;
    if (options.replace) {
      await doc.incrementalPatch({ data: values });
    } else {
      const current = { ...doc.data } as SettingsMap;
      await doc.incrementalPatch({ data: { ...current, ...values } });
    }
  }

  return { imported, skipped };
}
