import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AuthUsersHeader } from "@amodeo/proclaimer/feature/permission";
import { AuthUsersContent } from "@amodeo/proclaimer/feature/permission";

function AuthUsersPage() {
  return (
    <IonPage>
      <IonHeader>
        <AuthUsersHeader />
      </IonHeader>
      <IonContent>
        <AuthUsersContent />
      </IonContent>
    </IonPage>
  );
}

export default AuthUsersPage;
