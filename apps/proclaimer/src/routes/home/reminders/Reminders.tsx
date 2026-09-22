import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonList,
} from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";
import { format, startOfWeek } from "date-fns";

function RemindersPage() {
  const current_week_id = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Reminders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <NavItem label="CLAM" to={`/home/clam/${current_week_id}`} />
          <NavItem label="Audio Video" to="/home/reminders/audio-video" />
          <NavItem label="Weekend Meeting" to="/home/reminders/weekend-meeting" />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default RemindersPage;
