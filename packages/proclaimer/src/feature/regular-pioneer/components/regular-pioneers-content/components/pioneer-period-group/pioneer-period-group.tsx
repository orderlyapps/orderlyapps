import { IonItem, IonLabel, IonListHeader } from "@ionic/react";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { PioneerPeriodItem } from "../../../pioneer-period-item/pioneer-period-item.tsx";
import type { RegularPioneer } from "../../../../schemas/regular-pioneer.ts";

interface PioneerPeriodGroupProps {
  title: string;
  periods: RegularPioneer[];
  name_of: (publisher_id: string) => string;
  editable: boolean;
  on_edit: (period: RegularPioneer) => void;
}

export function PioneerPeriodGroup({
  title,
  periods,
  name_of,
  editable,
  on_edit,
}: PioneerPeriodGroupProps) {
  return (
    <>
      <IonListHeader>
        <IonLabel>{title}</IonLabel>
      </IonListHeader>
      {periods.length === 0 ? (
        <IonItem lines="none">
          <Body color="medium" size="sm">
            None recorded.
          </Body>
        </IonItem>
      ) : (
        periods.map((p) => (
          <PioneerPeriodItem
            key={p.id}
            period={p}
            name={name_of(p.publisher_id)}
            editable={editable}
            on_edit={on_edit}
          />
        ))
      )}
    </>
  );
}
