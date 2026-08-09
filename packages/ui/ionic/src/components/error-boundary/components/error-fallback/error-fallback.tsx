import { IonButton, IonIcon } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <div
      className="ion-display-flex ion-flex-direction-column ion-align-items-center ion-justify-content-center ion-text-center ion-padding"
      style={{ position: "fixed", inset: 0 }}
    >
      <IonIcon icon={alertCircleOutline} size="large" color="danger" />
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <div>
        <IonButton onClick={onReset}>Try again</IonButton>
        <IonButton fill="outline" onClick={() => window.location.reload()}>
          Reload app
        </IonButton>
      </div>
    </div>
  );
}
