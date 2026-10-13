import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MidweekMeetingScheduleHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Schedule</IonTitle>
    </IonToolbar>
  );
}
