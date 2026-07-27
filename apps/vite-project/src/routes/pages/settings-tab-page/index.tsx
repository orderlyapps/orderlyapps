import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { SettingsContent } from "../../../feature/settings/settings-content.tsx";

export default function SettingsTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <SettingsContent />
      </IonContent>
    </IonPage>
  );
}
