import { IonItem, IonLabel } from "@ionic/react";
import { formatPioneerPeriod } from "../../utils/pioneer-period.ts";
import type { RegularPioneer } from "../../schemas/regular-pioneer.ts";

interface PioneerPeriodItemProps {
  period: RegularPioneer;
  name?: string;
  editable?: boolean;
  on_edit?: (period: RegularPioneer) => void;
}

export function PioneerPeriodItem({
  period,
  name,
  editable = false,
  on_edit,
}: PioneerPeriodItemProps) {
  return (
    <IonItem button={editable} detail={editable} onClick={() => editable && on_edit?.(period)}>
      <IonLabel>
        {name ?? formatPioneerPeriod(period)}
        {name && <p>{formatPioneerPeriod(period)}</p>}
      </IonLabel>
    </IonItem>
  );
}
