import type { AppSettings, JsonValue, SettingsMap } from "./types.ts";

export async function exportAppSettings<T extends SettingsMap>(
  store: AppSettings<T>,
  { fileName = "app-settings", extension = "json" } = {},
): Promise<void> {
  const json = JSON.stringify(await store.getAll(), null, 2);
  const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${fileName}.${extension.replace(/^\.+/, "")}`;
  document.body.appendChild(anchor);
  try {
    anchor.click();
  } finally {
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function isJsonValue(value: unknown): value is JsonValue {
  if (value === null) return true;
  switch (typeof value) {
    case "boolean":
    case "string":
      return true;
    case "number":
      return Number.isFinite(value);
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
  return Array.isArray(value) ? "array" : typeof value;
}

export async function importAppSettings<T extends SettingsMap>(
  store: AppSettings<T>,
  json: string,
  { replace = false } = {},
): Promise<{ imported: string[]; skipped: string[] }> {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new Error("Settings file is not valid JSON.");
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new Error("Settings file must contain a JSON object.");
  }
  const existing = await store.getAll();
  const existingKeys = new Set(Object.keys(existing));
  const known: SettingsMap = {};
  const skipped: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (!isJsonValue(value)) {
      throw new Error(`Setting "${key}" contains a value that is not JSON-serialisable.`);
    }
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
    Object.defineProperty(known, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  }
  const imported = Object.keys(known);
  if (imported.length === 0) {
    throw new Error(
      skipped.length > 0
        ? "None of the settings in the file apply to this app; nothing was imported."
        : "Settings file contains no settings; nothing was imported.",
    );
  }
  if (replace) await store.replaceAll(known as Partial<T>);
  else await store.setMany(known as Partial<T>);
  return { imported, skipped };
}
