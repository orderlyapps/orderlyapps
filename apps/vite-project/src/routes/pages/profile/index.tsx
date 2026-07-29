import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { ProfileContent } from "@/feature/profile/components/profile-content.tsx";

export default function ProfileTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ProfileContent />
      </IonContent>
    </IonPage>
  );
}
