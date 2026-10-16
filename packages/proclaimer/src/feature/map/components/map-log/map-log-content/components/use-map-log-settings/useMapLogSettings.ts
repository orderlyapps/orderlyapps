import { useEffect, useState } from "react";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import type { CheckoutFilter } from "../types.ts";

export type MapLogListSortOrder = "alphabetical" | "checked_out";

export interface MapLogListSettings {
  checkout_filter: CheckoutFilter;
  sort_order: MapLogListSortOrder;
  tag_ids: string[];
  min_weeks_since_checkin: number;
}

const sortOrderValues: MapLogListSortOrder[] = ["alphabetical", "checked_out"];
const checkoutFilterValues: CheckoutFilter[] = ["any", "checked_out_only", "hide_checked_out"];

const SETTINGS_EVENT = "map-log-list-settings-changed";

const DEFAULT_SETTINGS: MapLogListSettings = {
  checkout_filter: "any",
  sort_order: "alphabetical",
  tag_ids: [],
  min_weeks_since_checkin: 52,
};

function readStoredSettings(storage_key: string): MapLogListSettings {
  const stored = localStorage.getItem(storage_key);
  if (!stored) return DEFAULT_SETTINGS;
  try {
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_SETTINGS;
    const p = parsed as Record<string, unknown>;
    return {
      checkout_filter: checkoutFilterValues.includes(p.checkout_filter as CheckoutFilter)
        ? (p.checkout_filter as CheckoutFilter)
        : DEFAULT_SETTINGS.checkout_filter,
      sort_order: sortOrderValues.includes(p.sort_order as MapLogListSortOrder)
        ? (p.sort_order as MapLogListSortOrder)
        : DEFAULT_SETTINGS.sort_order,
      tag_ids:
        Array.isArray(p.tag_ids) && p.tag_ids.every((t) => typeof t === "string")
          ? p.tag_ids
          : DEFAULT_SETTINGS.tag_ids,
      min_weeks_since_checkin:
        typeof p.min_weeks_since_checkin === "number" && p.min_weeks_since_checkin >= 0
          ? p.min_weeks_since_checkin
          : DEFAULT_SETTINGS.min_weeks_since_checkin,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useMapLogSettings(
  storage_key: string = localStorageKeyWithVariant("mapLogListSettings", "map_log"),
) {
  const [settings, set_settings] = useState<MapLogListSettings>(() =>
    readStoredSettings(storage_key),
  );

  useEffect(() => {
    function handleSettingsChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.storage_key === storage_key) {
        set_settings(readStoredSettings(storage_key));
      }
    }
    window.addEventListener(SETTINGS_EVENT, handleSettingsChange);
    return () => window.removeEventListener(SETTINGS_EVENT, handleSettingsChange);
  }, [storage_key]);

  function setSettings(next: MapLogListSettings) {
    localStorage.setItem(storage_key, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: { storage_key } }));
    set_settings(next);
  }

  return { settings, setSettings };
}
