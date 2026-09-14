import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useCircuitAssemblyEvent } from "../hooks/use-circuit-assembly-event.ts";

interface CircuitAssemblyBannerProps {
  week_id: string;
}

export function CircuitAssemblyBanner({ week_id }: CircuitAssemblyBannerProps) {
  const { event } = useCircuitAssemblyEvent(week_id);

  if (!event) return null;

  return (
    <IonList inset>
      <IonItem color="primary" className="ion-text-center">
        <IonLabel>Circuit Assembly</IonLabel>
      </IonItem>
    </IonList>
  );
}
