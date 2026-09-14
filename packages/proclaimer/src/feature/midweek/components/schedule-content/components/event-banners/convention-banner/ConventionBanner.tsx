import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useConventionEvent } from "../hooks/use-convention-event.ts";

interface ConventionBannerProps {
  week_id: string;
}

export function ConventionBanner({ week_id }: ConventionBannerProps) {
  const { event } = useConventionEvent(week_id);

  if (!event) return null;

  return (
    <IonList inset>
      <IonItem color="primary" className="ion-text-center">
        <IonLabel>Convention</IonLabel>
      </IonItem>
    </IonList>
  );
}
