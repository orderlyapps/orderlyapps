import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MidweekScheduleHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Schedule</IonTitle>
    </IonToolbar>
  );
}
