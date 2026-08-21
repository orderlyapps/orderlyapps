import { IonButton, IonContent, IonIcon, IonList, IonPage } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <IonPage>
      <IonContent>
        <IonList className="ion-text-center">
          <IonIcon icon={alertCircleOutline} size="large" color="danger" />
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <IonButton expand="block" onClick={onReset}>
            Try again
          </IonButton>
          <br />
          <IonButton expand="block" fill="outline" onClick={() => window.location.reload()}>
            Reload app
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
