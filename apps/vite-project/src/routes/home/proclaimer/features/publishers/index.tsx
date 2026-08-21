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

export default function PublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features" />
          </IonButtons>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>Publishers</h2>
              <p>Browse available publishers</p>
            </IonLabel>
          </IonItem>
          <IonItem routerLink="/home/proclaimer/features/publishers/all" detail>
            <IonLabel>All Publishers</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
