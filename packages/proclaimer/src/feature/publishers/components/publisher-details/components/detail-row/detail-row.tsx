import { BodyText } from "@amodeo/ionic";
import { IonItem, IonLabel } from "@ionic/react";

export interface DetailRowProps {
  label: string;
  value: string | null | undefined;
  lines?: "full" | "none" | "inset";
  onClick?: () => void;
}

export function DetailRow({ label, value, lines, onClick }: DetailRowProps) {
  return (
    <IonItem lines={lines} button={Boolean(onClick)} detail={Boolean(onClick)} onClick={onClick}>
      <IonLabel>
        <BodyText size="2xl" color="primary">
          {label}
        </BodyText>
        <h3>{value ?? "—"}</h3>
      </IonLabel>
    </IonItem>
  );
}
