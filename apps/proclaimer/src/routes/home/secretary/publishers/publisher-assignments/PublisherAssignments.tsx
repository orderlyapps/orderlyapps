import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherRecordHeader, usePublisherName } from "@amodeo/proclaimer/feature/reports";
import { AssignmentsContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/assignments/assignments-content/AssignmentsContent";

function PublisherAssignmentsPage() {
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
        <AssignmentsContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default PublisherAssignmentsPage;
