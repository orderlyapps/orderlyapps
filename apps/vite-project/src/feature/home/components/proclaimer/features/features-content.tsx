import { IonItem, IonLabel, IonList } from "@ionic/react";

export function FeaturesContent() {
  return (
    <IonList inset>
      <IonItem routerLink="/home/proclaimer/features/publishers" detail>
        <IonLabel>Publishers</IonLabel>
      </IonItem>
    </IonList>
  );
}
