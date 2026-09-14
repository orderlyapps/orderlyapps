import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PrayerHeader } from "@amodeo/proclaimer/feature/midweek";
import { PrayerContent } from "@amodeo/proclaimer/feature/midweek";

function PrayerPage() {
  return (
    <IonPage>
      <IonHeader>
        <PrayerHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <PrayerContent />
      </IonContent>
    </IonPage>
  );
}

export default PrayerPage;
