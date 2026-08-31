import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MissingDetailsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>Missing Details</IonTitle>
    </IonToolbar>
  );
}
