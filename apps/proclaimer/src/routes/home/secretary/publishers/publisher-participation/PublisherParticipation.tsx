import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import {
  DownloadPublisherRecordButton,
  usePublisherName,
} from "@amodeo/proclaimer/feature/reports";
import { ParticipationContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/participation/participation-content/ParticipationContent";

function PublisherParticipationPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/home/secretary/publishers/${publisher_id}`} />
          </IonButtons>
          <IonTitle>{publisher_name}</IonTitle>
          <IonButtons slot="end">
            <DownloadPublisherRecordButton publisher_id={publisher_id ?? ""} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="remove-top-padding">
        <ParticipationContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default PublisherParticipationPage;
