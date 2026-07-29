import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

import type { ThemeMode } from "../../hooks/use-theme/use-theme.ts";

export interface ThemeSelectorProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

const MODES: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function ThemeSelector({ mode, onModeChange }: ThemeSelectorProps) {
  return (
    <IonSegment
      slot="end"
      value={mode}
      onIonChange={(e) => {
        const value = e.detail.value;
        if (value === "light" || value === "dark" || value === "system") {
          onModeChange(value);
        }
      }}
    >
      {MODES.map((m) => (
        <IonSegmentButton key={m.value} value={m.value}>
          <IonLabel>{m.label}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
}
