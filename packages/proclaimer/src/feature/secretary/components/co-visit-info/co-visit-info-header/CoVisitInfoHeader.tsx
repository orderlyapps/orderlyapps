import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CoVisitInfoHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>CO Visit Info</IonTitle>
    </IonToolbar>
  );
}
