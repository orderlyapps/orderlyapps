import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { WeekendHeader, WeekendContent } from "@amodeo/proclaimer/feature/weekend";

function WeekendPage() {
  return (
    <IonPage>
      <IonHeader>
        <WeekendHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <WeekendContent />
      </IonContent>
    </IonPage>
  );
}

export default WeekendPage;
