import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { ProfileContent } from "@amodeo/subbie/feature/profile";

export default function ProfileTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProfileContent />
      </IonContent>
    </IonPage>
  );
}
