import { IonPage, IonHeader, IonContent } from "@ionic/react";
import {
  ReorganisedGroupsHeader,
  ReorganisedGroupsContent,
} from "@amodeo/proclaimer/feature/group-reorganisation";

function ReorganiseGroupsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ReorganisedGroupsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <ReorganisedGroupsContent />
      </IonContent>
    </IonPage>
  );
}

export default ReorganiseGroupsPage;
