import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function CongregationsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features" />
          </IonButtons>
          <IonTitle>Congregations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>Congregations</h2>
              <p>Browse available congregations</p>
            </IonLabel>
          </IonItem>
          <IonItem routerLink="/home/proclaimer/features/congregations/all" detail>
            <IonLabel>All Congregations</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
