import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { AssignmentsHeader } from "@amodeo/proclaimer/feature/secretary";
import { AssignmentsContent } from "@amodeo/proclaimer/feature/secretary";
import { usePublisherName } from "@amodeo/proclaimer/feature/reports";

function AllPublishersAssignmentsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <AssignmentsHeader
          publisher_name={publisher_name}
          default_href={`/publishers/all/${publisher_id}`}
        />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <AssignmentsContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default AllPublishersAssignmentsPage;
