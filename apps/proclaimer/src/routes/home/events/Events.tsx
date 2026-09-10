import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { EventsList } from "@amodeo/proclaimer/feature/event";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";

function HomeEventsPage() {
  const permissions = usePermissions();
  const history = useHistory();

  const can_edit =
    permissions.has_events || permissions.has_congregation_admin || permissions.is_super_admin;

  const edit_href = can_edit ? (event_id: string) => `/home/events/edit/${event_id}` : undefined;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Events</IonTitle>
          {can_edit && (
            <IonButtons slot="end">
              <AddIconButton on_click={() => history.push("/home/events/edit")} />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <EventsList edit_href={edit_href} />
      </IonContent>
    </IonPage>
  );
}

export default HomeEventsPage;
