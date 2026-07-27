import { IonItem, IonLabel, IonList, IonToggle } from "@ionic/react";

export function SettingsContent() {
  return (
    <IonList>
      <IonItem>
        <IonLabel>Enable notifications</IonLabel>
        <IonToggle slot="end" />
      </IonItem>
      <IonItem>
        <IonLabel>Dark mode</IonLabel>
        <IonToggle slot="end" />
      </IonItem>
      <IonItem routerLink="/tabs/settings/about" detail>
        <IonLabel>About</IonLabel>
      </IonItem>
    </IonList>
  );
}
