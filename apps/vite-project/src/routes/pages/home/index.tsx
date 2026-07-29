import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { HomeContent } from "@/feature/home/components/home-content.tsx";

export default function HomeTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <HomeContent />
      </IonContent>
    </IonPage>
  );
}
