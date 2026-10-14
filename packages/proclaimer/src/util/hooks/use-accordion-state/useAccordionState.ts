import { useState } from "react";
import type { AccordionGroupCustomEvent } from "@ionic/react";

function readStoredValue(storageKey: string, defaultValue: string | undefined) {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored === null ? defaultValue : stored || undefined;
  } catch {
    return defaultValue;
  }
}

export function useAccordionState(storageKey: string, defaultValue: string | undefined) {
  const [state, setState] = useState<{ key: string; value: string | undefined }>(() => ({
    key: storageKey,
    value: readStoredValue(storageKey, defaultValue),
  }));

  if (state.key !== storageKey) {
    setState({ key: storageKey, value: readStoredValue(storageKey, defaultValue) });
  }

  function onIonChange(event: AccordionGroupCustomEvent) {
    const next = event.detail.value as string | undefined;
    setState({ key: storageKey, value: next });
    try {
      localStorage.setItem(storageKey, next ?? "");
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  return { value: state.value, onIonChange };
}
