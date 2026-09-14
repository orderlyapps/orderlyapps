import { IonItem, IonLabel, IonList } from "@ionic/react";
import type { EventRow } from "@amodeo/proclaimer/feature/event";

interface CircuitVisitBannerProps {
  event: EventRow | undefined;
}

export function CircuitVisitBanner({ event }: CircuitVisitBannerProps) {
  if (!event) return null;

  return (
    <IonList inset>
      <IonItem color="primary" className="ion-text-center">
        <IonLabel>Circuit Overseer Visit</IonLabel>
      </IonItem>
    </IonList>
  );
}
