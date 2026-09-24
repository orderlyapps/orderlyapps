import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { ParticipationHeader } from "@amodeo/proclaimer/feature/secretary";
import { ParticipationContent } from "@amodeo/proclaimer/feature/secretary";

function AllPublishersParticipationPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <ParticipationHeader />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <ParticipationContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default AllPublishersParticipationPage;
