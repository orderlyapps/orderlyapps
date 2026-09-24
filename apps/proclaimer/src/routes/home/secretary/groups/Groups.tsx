import { GroupsHeader } from "@amodeo/proclaimer/feature/secretary";
import { GroupsContent } from "@amodeo/proclaimer/feature/secretary";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function GroupsPage() {
  return (
    <IonPage>
      <IonHeader>
        <GroupsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <GroupsContent />
      </IonContent>
    </IonPage>
  );
}

export default GroupsPage;
