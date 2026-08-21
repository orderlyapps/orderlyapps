import { useSyncExternalStore } from "react";

import { getModeSnapshot, getResolvedSnapshot, setMode, subscribe } from "./theme.ts";
import type { ResolvedTheme, ThemeMode } from "./types.ts";

export interface UseThemeResult {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

export function useTheme(): UseThemeResult {
  const mode = useSyncExternalStore(subscribe, getModeSnapshot, (): ThemeMode => "system");
  const resolved = useSyncExternalStore(
    subscribe,
    getResolvedSnapshot,
    (): ResolvedTheme => "light",
  );
  return { mode, resolved, setMode };
}
