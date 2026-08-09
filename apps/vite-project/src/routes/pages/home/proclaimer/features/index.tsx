import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FeaturesContent } from "@/feature/home/components/proclaimer/features/features-content.tsx";

export default function FeaturesPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer" />
          </IonButtons>
          <IonTitle>Features</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FeaturesContent />
      </IonContent>
    </IonPage>
  );
}
