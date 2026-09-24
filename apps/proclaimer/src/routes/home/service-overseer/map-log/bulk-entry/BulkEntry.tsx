import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { BulkEntryHeader } from "@amodeo/proclaimer/feature/map";
import { BulkEntryContent } from "@amodeo/proclaimer/feature/map";

function BulkEntryPage() {
  return (
    <IonPage>
      <IonHeader>
        <BulkEntryHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <BulkEntryContent />
      </IonContent>
    </IonPage>
  );
}

export default BulkEntryPage;
