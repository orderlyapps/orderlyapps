import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ProclaimerContent } from "@/feature/home/components/proclaimer/proclaimer-content.tsx";

export default function ProclaimerPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Proclaimer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProclaimerContent />
      </IonContent>
    </IonPage>
  );
}
