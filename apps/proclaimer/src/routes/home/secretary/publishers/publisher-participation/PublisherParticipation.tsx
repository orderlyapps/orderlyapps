import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherRecordHeader, usePublisherName } from "@amodeo/proclaimer/feature/reports";
import { ParticipationContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/participation/participation-content/ParticipationContent";

function PublisherParticipationPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <PublisherRecordHeader
          publisher_name={publisher_name}
          publisher_id={publisher_id ?? ""}
          default_href={`/home/secretary/publishers/${publisher_id}`}
        />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <ParticipationContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default PublisherParticipationPage;
