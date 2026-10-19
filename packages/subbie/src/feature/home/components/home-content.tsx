import { IonItem, IonLabel, IonList } from "@ionic/react";

export function HomeContent() {
  return (
    <IonList inset>
      <IonItem>
        <IonLabel>Welcome to the Subbie Home tab</IonLabel>
      </IonItem>
      <IonItem routerLink="/home/details" detail>
        <IonLabel>View details</IonLabel>
      </IonItem>
    </IonList>
  );
}
