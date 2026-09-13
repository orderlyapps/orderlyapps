import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { EventEditor, useEventEdit } from "@amodeo/proclaimer/feature/event";

function EditEventPage() {
  const { event_id } = useParams<{ event_id?: string }>();
  const history = useHistory();
  const { form, can_edit, is_new, handleFieldChange, handleDetailsChange, saveEvent, deleteEvent } =
    useEventEdit(event_id);

  function handleSave() {
    if (saveEvent()) {
      history.push("/home/events");
    }
  }

  function handleDelete() {
    if (deleteEvent()) {
      history.push("/home/events");
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/events" />
          </IonButtons>
          <IonTitle>{is_new ? "New Event" : "Edit Event"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <EventEditor
          can_edit={can_edit}
          is_new={is_new}
          form={form}
          on_change={handleFieldChange}
          on_details_change={handleDetailsChange}
          on_save={handleSave}
          on_delete={handleDelete}
        />
      </IonContent>
    </IonPage>
  );
}

export default EditEventPage;
