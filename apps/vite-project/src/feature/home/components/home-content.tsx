import { IonItem, IonLabel, IonList } from "@ionic/react";

export function HomeContent() {
  return (
    <IonList>
      <IonItem>
        <IonLabel>Welcome to the Home tab</IonLabel>
      </IonItem>
      <IonItem routerLink="/tabs/home/details" detail>
        <IonLabel>View details</IonLabel>
      </IonItem>
    </IonList>
  );
}
