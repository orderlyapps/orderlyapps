import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export default function HomeTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>Home</IonContent>
    </IonPage>
  );
}
