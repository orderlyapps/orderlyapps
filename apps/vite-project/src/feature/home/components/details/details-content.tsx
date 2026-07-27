import { IonItem, IonLabel, IonList } from "@ionic/react";

export function DetailsContent() {
  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <h2>Details</h2>
          <p>More information about the selected item</p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
}
