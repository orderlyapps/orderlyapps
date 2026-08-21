import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function HomeTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem routerLink="/home/details" detail>
            <IonLabel>View details</IonLabel>
          </IonItem>
          <IonItem routerLink="/home/proclaimer" detail>
            <IonLabel>Proclaimer</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
