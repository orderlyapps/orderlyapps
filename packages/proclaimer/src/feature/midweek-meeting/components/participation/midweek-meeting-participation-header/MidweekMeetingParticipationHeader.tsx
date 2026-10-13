import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MidweekMeetingParticipationHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/midweek-meeting-overseer" />
      </IonButtons>
      <IonTitle>Participation</IonTitle>
    </IonToolbar>
  );
}
