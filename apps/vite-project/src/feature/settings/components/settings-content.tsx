import { IonItem, IonLabel, IonList, IonToggle } from "@ionic/react";
import { FontSizeSelector, ThemeSelector } from "@amodeo/ionic";

export function SettingsContent() {
  return (
    <IonList inset>
      <IonItem>
        <IonLabel>Enable notifications</IonLabel>
        <IonToggle slot="end" />
      </IonItem>
      <IonItem>
        <IonLabel>Theme</IonLabel>
        <ThemeSelector />
      </IonItem>
      <IonItem>
        <IonLabel>Font size</IonLabel>
        <FontSizeSelector />
      </IonItem>
      <IonItem routerLink="/settings/about" detail>
        <IonLabel>About</IonLabel>
      </IonItem>
    </IonList>
  );
}
