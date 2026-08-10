import { IonItem, IonLabel } from "@ionic/react";
import type { CongregationRecord } from "../../../../congregation-schema.js";

export interface CongregationListItemProps {
  congregation: CongregationRecord;
  routerLink?: string;
}

export function CongregationListItem({ congregation, routerLink }: CongregationListItemProps) {
  return (
    <IonItem routerLink={routerLink} detail={Boolean(routerLink)}>
      <IonLabel>
        <h2>{congregation.name}</h2>
      </IonLabel>
    </IonItem>
  );
}
