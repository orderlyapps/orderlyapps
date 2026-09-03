import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import {
  PublisherRecordHeader,
  PublisherRecordContent,
  usePublisherName,
} from "@amodeo/proclaimer/feature/reports";

function PublisherReportsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <PublisherRecordHeader
          publisher_name={publisher_name}
          publisher_id={publisher_id ?? ""}
          default_href={`/publishers/all/${publisher_id}`}
        />
      </IonHeader>
      <IonContent className="remove-top-padding">
        <PublisherRecordContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default PublisherReportsPage;
