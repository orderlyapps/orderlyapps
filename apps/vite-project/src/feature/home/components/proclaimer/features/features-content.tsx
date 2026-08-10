import { IonItem, IonLabel, IonList } from "@ionic/react";

export function FeaturesContent() {
  return (
    <IonList inset>
      <IonItem routerLink="/home/proclaimer/features/publishers" detail>
        <IonLabel>Publishers</IonLabel>
      </IonItem>
      <IonItem routerLink="/home/proclaimer/features/congregations" detail>
        <IonLabel>Congregations</IonLabel>
      </IonItem>
    </IonList>
  );
}
