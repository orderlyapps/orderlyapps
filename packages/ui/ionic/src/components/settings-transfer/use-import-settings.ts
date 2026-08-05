import { useRef, useState, type ChangeEvent } from "react";
import { importAppSettings, type AppSettings, type SettingsMap } from "@amodeo/utils";

/** Maximum accepted settings file size (1 MB) to guard against memory abuse. */
const MAX_FILE_SIZE_BYTES = 1_000_000;
/** Delay before reloading so the success toast is visible. */
const RELOAD_DELAY_MS = 1500;

export interface UseImportSettingsOptions<T extends SettingsMap> {
  store: AppSettings<T>;
  replace?: boolean;
  reloadAfterImport?: boolean;
}

export function useImportSettings<T extends SettingsMap>({
  store,
  replace,
  reloadAfterImport = true,
}: UseImportSettingsOptions<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("Settings file is too large (maximum 1 MB).");
      return;
    }
    try {
      const { imported, skipped } = await importAppSettings(store, await file.text(), { replace });
      const message =
        `Imported ${imported.length} setting${imported.length === 1 ? "" : "s"}` +
        (skipped.length > 0 ? `, skipped ${skipped.length}.` : ".");
      setSuccess(reloadAfterImport ? `${message} Reloading…` : message);
      if (reloadAfterImport) setTimeout(() => window.location.reload(), RELOAD_DELAY_MS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import settings.");
    }
  }

  return {
    inputRef,
    error,
    success,
    handleFile,
    dismissError: () => setError(null),
    dismissSuccess: () => setSuccess(null),
    openFilePicker: () => inputRef.current?.click(),
  };
}
