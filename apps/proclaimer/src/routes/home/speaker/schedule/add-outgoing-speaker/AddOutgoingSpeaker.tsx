import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import {
  AddOutgoingSpeakerHeader,
  AddOutgoingSpeakerContent,
} from "@amodeo/proclaimer/feature/speaker";

function AddOutgoingSpeakerPage() {
  const { week_id } = useParams<{ week_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <AddOutgoingSpeakerHeader back_href={`/home/speaker/schedule/${week_id}`} />
      </IonHeader>
      <IonContent className="content-wide">
        <AddOutgoingSpeakerContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default AddOutgoingSpeakerPage;
