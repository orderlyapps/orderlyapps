import { IonItem, IonLabel, IonList } from "@ionic/react";

export function PublishersContent() {
  return (
    <IonList inset>
      <IonItem>
        <IonLabel>
          <h2>Publishers</h2>
          <p>Browse available publishers</p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
}
