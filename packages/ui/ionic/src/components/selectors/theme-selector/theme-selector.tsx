import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

import { useTheme } from "@amodeo/utils";
import type { ThemeMode } from "@amodeo/utils";

const MODES: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function ThemeSelector() {
  const { mode, setMode } = useTheme();

  return (
    <IonSegment
      slot="end"
      value={mode}
      onIonChange={(e) => {
        const value = e.detail.value;
        if (value === "light" || value === "dark" || value === "system") {
          setMode(value);
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
