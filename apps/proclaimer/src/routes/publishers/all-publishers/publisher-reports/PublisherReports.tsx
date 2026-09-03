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
  PublisherRecordContent,
  usePublisherName,
} from "@amodeo/proclaimer/feature/reports";

function PublisherReportsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();
  const publisher_name = usePublisherName(publisher_id ?? "");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/publishers/all/${publisher_id}`} />
          </IonButtons>
          <IonTitle>{publisher_name}</IonTitle>
          <IonButtons slot="end">
            <DownloadPublisherRecordButton publisher_id={publisher_id ?? ""} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="remove-top-padding">
        <PublisherRecordContent publisher_id={publisher_id ?? ""} />
      </IonContent>
    </IonPage>
  );
}

export default PublisherReportsPage;
