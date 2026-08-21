import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export default function SettingsTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>Settings</IonContent>
    </IonPage>
  );
}
