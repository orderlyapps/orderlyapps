import type { AppSettings, JsonValue, SettingsMap } from "./types.ts";

export interface ImportAppSettingsOptions {
  /**
   * When `true`, all existing settings are cleared before the imported
   * values are written. Defaults to `false` (merge over existing values).
   */
  replace?: boolean;
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
 * Throws a descriptive `Error` when the file content is invalid.
 */
export async function importAppSettings<T extends SettingsMap>(
  store: AppSettings<T>,
  json: string,
  options: ImportAppSettingsOptions = {},
): Promise<void> {
  const data = parseAppSettings(json);
  const existingKeys = new Set(Object.keys(await store.getAll()));
  const known = Object.fromEntries(Object.entries(data).filter(([key]) => existingKeys.has(key)));
  if (options.replace) await store.clear();
  await store.setMany(known as Partial<T>);
}
