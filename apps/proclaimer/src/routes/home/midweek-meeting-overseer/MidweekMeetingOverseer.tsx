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
import { format, startOfWeek } from "date-fns";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

function MidweekMeetingOverseerPage() {
  const currentWeekId = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>CLAM Overseer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <NavItem label="Participation" to="/home/midweek-meeting-overseer/participation" />
          <NavItem
            label="Schedule"
            to={`/home/midweek-meeting-overseer/schedule/${currentWeekId}`}
          />
          <NavItem label="PDF" to="/home/elder/midweek-meeting" />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingOverseerPage;
