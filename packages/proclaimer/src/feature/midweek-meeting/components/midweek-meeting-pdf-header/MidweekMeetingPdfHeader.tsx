import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MidweekMeetingPdfHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder" />
      </IonButtons>
      <IonTitle>CLAM</IonTitle>
    </IonToolbar>
  );
}
