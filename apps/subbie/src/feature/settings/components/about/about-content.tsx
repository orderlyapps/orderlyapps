import { IonItem, IonLabel, IonList } from "@ionic/react";

export function AboutContent() {
  return (
    <IonList inset>
      <IonItem>
        <IonLabel>
          <h2>About</h2>
          <p>Version 0.0.0</p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
}
