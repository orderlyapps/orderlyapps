import { IonItem, IonLabel, IonList } from "@ionic/react";

export function CongregationsContent() {
  return (
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
  );
}
