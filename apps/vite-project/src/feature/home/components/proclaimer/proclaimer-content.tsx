import { IonItem, IonLabel, IonList } from "@ionic/react";

export function ProclaimerContent() {
  return (
    <IonList inset>
      <IonItem routerLink="/home/proclaimer/features" detail>
        <IonLabel>Features</IonLabel>
      </IonItem>
    </IonList>
  );
}
