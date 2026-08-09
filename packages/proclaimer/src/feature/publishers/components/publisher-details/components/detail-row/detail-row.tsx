import { IonItem, IonLabel } from "@ionic/react";

export interface DetailRowProps {
  label: string;
  value: string | null | undefined;
  lines?: "full" | "none" | "inset";
}

export function DetailRow({ label, value, lines }: DetailRowProps) {
  return (
    <IonItem lines={lines}>
      <IonLabel>
        <p>{label}</p>
        <h3>{value ?? "—"}</h3>
      </IonLabel>
    </IonItem>
  );
}
