import { useState } from "react";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import type { ParticipationType } from "../../utils/participation-type-map.ts";
import { participationTypeMap } from "../../utils/participation-type-map.ts";

export type GenderFilter = "all" | "male" | "female";

export interface PublisherSelectorSettings {
  gender: GenderFilter;
  stat_participation_types: ParticipationType[];
}

export const genderFilteredTypes: ParticipationType[] = ["apply", "assistant"];

export function usesGenderFilter(participation_type: ParticipationType): boolean {
  return genderFilteredTypes.includes(participation_type);
}

const genderFilterValues: GenderFilter[] = ["all", "male", "female"];
const participationTypeValues = new Set<string>(Object.values(participationTypeMap));

function defaultSettings(participation_type: ParticipationType): PublisherSelectorSettings {
  return {
    gender: "all",
    stat_participation_types: [participation_type],
  };
}

function readStoredSettings(participation_type: ParticipationType): PublisherSelectorSettings {
  const defaults = defaultSettings(participation_type);
  const key = localStorageKeyWithVariant("midweekSelectorSettings", participation_type);
  const stored = localStorage.getItem(key);
  if (!stored) return defaults;
  try {
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) return defaults;
    const p = parsed as Record<string, unknown>;
    return {
      gender: genderFilterValues.includes(p.gender as GenderFilter)
        ? (p.gender as GenderFilter)
        : defaults.gender,
      stat_participation_types:
        Array.isArray(p.stat_participation_types) &&
        p.stat_participation_types.every((t) => participationTypeValues.has(t as string))
          ? (p.stat_participation_types as ParticipationType[])
          : defaults.stat_participation_types,
    };
  } catch {
    return defaults;
  }
}

export function useSelectorSettings(participation_type: ParticipationType | null) {
  const [state, set_state] = useState<{
    type: ParticipationType | null;
    settings: PublisherSelectorSettings;
  }>(() => ({
    type: participation_type,
    settings: participation_type
      ? readStoredSettings(participation_type)
      : defaultSettings("prayer"),
  }));

  if (state.type !== participation_type) {
    set_state({
      type: participation_type,
      settings: participation_type
        ? readStoredSettings(participation_type)
        : defaultSettings("prayer"),
    });
  }

  function setSettings(next: PublisherSelectorSettings) {
    if (!participation_type) return;
    const key = localStorageKeyWithVariant("midweekSelectorSettings", participation_type);
    localStorage.setItem(key, JSON.stringify(next));
    set_state({ type: participation_type, settings: next });
  }

  return { settings: state.settings, setSettings };
}
