import type { AppSettings, JsonValue, SettingsMap } from "./types.ts";

export interface ImportAppSettingsOptions {
  /**
   * When `true`, existing settings are replaced with the imported
   * values. Defaults to `false` (merge over existing values).
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
