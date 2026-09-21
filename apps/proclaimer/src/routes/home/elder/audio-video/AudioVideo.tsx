import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AudioVideoHeader } from "@amodeo/proclaimer/feature/av";
import { AudioVideoContent } from "@proclaimer-content/pages/home/elder/audio-video/audio-video-content/AudioVideoContent";

function AudioVideoPage() {
  return (
    <IonPage>
      <IonHeader>
        <AudioVideoHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <AudioVideoContent />
      </IonContent>
    </IonPage>
  );
}

export default AudioVideoPage;
