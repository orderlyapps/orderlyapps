import { IonItem, IonLabel, IonList, IonToggle } from "@ionic/react";
import { ThemeSelector, useTheme } from "@amodeo/ionic";

export function SettingsContent() {
  const { mode, setMode } = useTheme();

  return (
    <IonList inset>
      <IonItem>
        <IonLabel>Enable notifications</IonLabel>
        <IonToggle slot="end" />
      </IonItem>
      <IonItem>
        <IonLabel>Theme</IonLabel>
        <ThemeSelector mode={mode} onModeChange={setMode} />
      </IonItem>
      <IonItem routerLink="/settings/about" detail>
        <IonLabel>About</IonLabel>
      </IonItem>
    </IonList>
  );
}
