import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { GroupsHeader, GroupsContent } from "@amodeo/proclaimer/feature/group";

function GroupsPage() {
  return (
    <IonPage>
      <IonHeader>
        <GroupsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <GroupsContent />
      </IonContent>
    </IonPage>
  );
}

export default GroupsPage;
