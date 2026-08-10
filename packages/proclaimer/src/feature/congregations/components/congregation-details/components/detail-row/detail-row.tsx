import { BodyText } from "@amodeo/ionic";
import { IonItem, IonLabel } from "@ionic/react";

export interface DetailRowProps {
  label: string;
  value: string | null | undefined;
  lines?: "full" | "none" | "inset";
  onClick?: () => void;
  routerLink?: string;
}

export function DetailRow({ label, value, lines, onClick, routerLink }: DetailRowProps) {
  return (
    <IonItem
      lines={lines}
      button={Boolean(onClick || routerLink)}
      detail={Boolean(onClick || routerLink)}
      onClick={onClick}
      routerLink={routerLink}
    >
      <IonLabel>
        <BodyText size="2xl" color="primary">
          {label}
        </BodyText>
        <h3>{value ?? "—"}</h3>
      </IonLabel>
    </IonItem>
  );
}
