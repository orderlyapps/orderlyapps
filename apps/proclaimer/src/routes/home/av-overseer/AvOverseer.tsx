import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonList,
} from "@ionic/react";
import { format, startOfWeek } from "date-fns";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

function AvOverseerPage() {
  const currentWeekId = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>AV Overseer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <NavItem label="Participation" to="/home/av-overseer/participation" />
          <NavItem label="Participants" to="/home/av-overseer/participants" />
          <NavItem label="Schedule" to={`/home/av-overseer/schedule/${currentWeekId}`} />
          <NavItem label="PDF" to="/home/elder/audio-video" />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default AvOverseerPage;
