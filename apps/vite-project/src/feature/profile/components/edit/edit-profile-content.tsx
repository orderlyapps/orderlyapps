import { IonInput, IonItem, IonLabel, IonList } from "@ionic/react";

export function EditProfileContent() {
  return (
    <IonList inset>
      <IonItem>
        <IonLabel position="stacked">Name</IonLabel>
        <IonInput placeholder="Enter your name" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Email</IonLabel>
        <IonInput type="email" placeholder="Enter your email" />
      </IonItem>
    </IonList>
  );
}
