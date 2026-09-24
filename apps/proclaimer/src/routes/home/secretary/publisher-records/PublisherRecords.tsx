import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublisherRecordsHeader } from "@amodeo/proclaimer/feature/secretary";
import { PublisherRecordsContent } from "@amodeo/proclaimer/feature/secretary";

function PublisherRecordsPage() {
  return (
    <IonPage>
      <IonHeader>
        <PublisherRecordsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <PublisherRecordsContent />
      </IonContent>
    </IonPage>
  );
}

export default PublisherRecordsPage;
