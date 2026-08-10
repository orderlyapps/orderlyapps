import type { AppDatabase, AppSettings, SettingsMap } from "./types.ts";

export interface ExportAppSettingsOptions {
  /** Base name of the downloaded file (without extension). Defaults to `"app-settings"`. */
  fileName?: string;
  /**
   * File extension for the download, with or without a leading dot.
   * Defaults to `"json"`.
   */
  extension?: string;
  /**
   * Whether to trigger a browser download. Defaults to `true`.
   * Pass `false` to only get the serialized JSON string back.
   */
  download?: boolean;
}

/** Combines a base file name and extension into a download file name. */
export function resolveSettingsFileName(fileName = "app-settings", extension = "json"): string {
  return `${fileName}.${extension.replace(/^\.+/, "")}`;
}

/**
 * Serializes all stored settings to a JSON string and, in browser
 * environments, triggers a file download. Returns the JSON string.
 *
 * Note: only keys explicitly written to the store are exported. Default
 * values passed to `createAppSettings` are seeded on init, so they are
 * included — but defaults introduced in a later app version won't appear
 * in exports from installs created before that version.
 */
export async function exportAppSettings<T extends SettingsMap>(
  store: AppSettings<T>,
  options: ExportAppSettingsOptions = {},
): Promise<string> {
  const { fileName, extension, download = true } = options;
  const json = JSON.stringify(await store.getAll(), null, 2);

  if (download && typeof document !== "undefined") {
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = resolveSettingsFileName(fileName, extension);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return json;
}

/**
 * Serializes every settings document in a shared `AppDatabase` to a single
 * JSON string and, in browser environments, triggers a file download. The
 * resulting object is keyed by document ID (e.g. `"preferences"`,
 * `"onboarding"`), each containing that domain's settings map.
 *
 * This is the recommended way to export when multiple stores share one
 * database — a single file captures every settings domain.
 */
export async function exportAppDatabase(
  database: AppDatabase,
  options: ExportAppSettingsOptions = {},
): Promise<string> {
  const { fileName = "app-database", extension, download = true } = options;
  const collection = database.settings;
  const allDocs = await collection.find().exec();
  const result: Record<string, SettingsMap> = {};
  for (const doc of allDocs) {
    result[doc.id] = doc.data as SettingsMap;
  }
  const json = JSON.stringify(result, null, 2);

  if (download && typeof document !== "undefined") {
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = resolveSettingsFileName(fileName, extension);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return json;
}
