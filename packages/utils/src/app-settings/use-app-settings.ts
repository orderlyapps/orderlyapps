import { useEffect, useState } from "react";

import type { AppSettings, SettingsMap } from "./types.ts";

export interface UseAppSettingsResult<T extends SettingsMap> {
  settings: Partial<T>;
  ready: boolean;
  set: AppSettings<T>["set"];
  setMany: AppSettings<T>["setMany"];
  remove: AppSettings<T>["remove"];
  clear: AppSettings<T>["clear"];
}

/**
 * Subscribes to an `AppSettings` store and re-renders on every change.
 *
 * ```tsx
 * const settings = await createAppSettings<MyAppSettings>({ dbName: "my-app" });
 * const { settings: values, set } = useAppSettings(settings);
 * ```
 */
export function useAppSettings<T extends SettingsMap>(
  store: AppSettings<T>,
): UseAppSettingsResult<T> {
  const [settings, setSettings] = useState<Partial<T>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    let subEmitted = false;
    const unsubscribe = store.subscribe((next) => {
      if (!active) return;
      subEmitted = true;
      setSettings(next);
      setReady(true);
    });
    void store.getAll().then((all) => {
      if (!active || subEmitted) return;
      setSettings(all);
      setReady(true);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [store]);

  return {
    settings,
    ready,
    set: (key, value) => store.set(key, value),
    setMany: (values) => store.setMany(values),
    remove: (key) => store.remove(key),
    clear: () => store.clear(),
  };
}
