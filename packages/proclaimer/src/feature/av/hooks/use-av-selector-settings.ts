import { useState } from "react";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import {
  avParticipationTypes,
  type AvParticipationType,
} from "../utils/av-participation-type-labels.ts";

export interface AvSelectorSettings {
  stat_participation_types: AvParticipationType[];
}

const participationTypeValues = new Set<string>(avParticipationTypes);

function defaultSettings(participation_type: AvParticipationType): AvSelectorSettings {
  return {
    stat_participation_types: [participation_type],
  };
}

function readStoredSettings(participation_type: AvParticipationType): AvSelectorSettings {
  const defaults = defaultSettings(participation_type);
  const key = localStorageKeyWithVariant("avSelectorSettings", participation_type);
  const stored = localStorage.getItem(key);
  if (!stored) return defaults;
  try {
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) return defaults;
    const p = parsed as Record<string, unknown>;
    return {
      stat_participation_types:
        Array.isArray(p.stat_participation_types) &&
        p.stat_participation_types.every((t) => participationTypeValues.has(t as string))
          ? (p.stat_participation_types as AvParticipationType[])
          : defaults.stat_participation_types,
    };
  } catch {
    return defaults;
  }
}

export function useAvSelectorSettings(participation_type: AvParticipationType) {
  const [state, set_state] = useState<{
    type: AvParticipationType;
    settings: AvSelectorSettings;
  }>(() => ({
    type: participation_type,
    settings: readStoredSettings(participation_type),
  }));

  if (state.type !== participation_type) {
    set_state({
      type: participation_type,
      settings: readStoredSettings(participation_type),
    });
  }

  function setSettings(next: AvSelectorSettings) {
    const key = localStorageKeyWithVariant("avSelectorSettings", participation_type);
    localStorage.setItem(key, JSON.stringify(next));
    set_state({ type: participation_type, settings: next });
  }

  return { settings: state.settings, setSettings };
}
