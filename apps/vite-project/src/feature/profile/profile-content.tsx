import { IonAvatar, IonItem, IonLabel, IonList } from "@ionic/react";

export function ProfileContent() {
  return (
    <IonList>
      <IonItem>
        <IonAvatar slot="start" />
        <IonLabel>
          <h2>User Profile</h2>
          <p>Edit your account details here</p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
}
