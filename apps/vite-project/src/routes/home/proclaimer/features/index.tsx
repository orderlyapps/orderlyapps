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

export default function FeaturesPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer" />
          </IonButtons>
          <IonTitle>Features</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem routerLink="/home/proclaimer/features/publishers" detail>
            <IonLabel>Publishers</IonLabel>
          </IonItem>
          <IonItem routerLink="/home/proclaimer/features/congregations" detail>
            <IonLabel>Congregations</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
