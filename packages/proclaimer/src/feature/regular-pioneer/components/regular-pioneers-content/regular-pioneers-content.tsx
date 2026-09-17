import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { publisherCollection, getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { usePioneerPeriods } from "../../hooks/use-pioneer-periods.ts";
import { isActivePeriod } from "../../utils/pioneer-period.ts";
import { PioneerPeriodModal } from "../pioneer-period-modal/pioneer-period-modal.tsx";
import { PioneerPeriodGroup } from "./components/pioneer-period-group/pioneer-period-group.tsx";
import type { RegularPioneer } from "../../schemas/regular-pioneer.ts";

export function RegularPioneersContent() {
  const { periods } = usePioneerPeriods();
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const { has_secretary, has_congregation_admin, is_super_admin } = usePermissions();
  const can_edit = has_secretary || has_congregation_admin || is_super_admin;
  const [modal, set_modal] = useState<"add" | RegularPioneer | null>(null);

  const name_of = (publisher_id: string) => {
    const publisher = publishers?.find((p) => p.id === publisher_id);
    return publisher ? getPublisherDisplayName(publisher, "last_first") : "Unknown publisher";
  };

  const by_start_desc = (a: RegularPioneer, b: RegularPioneer) =>
    b.start_month.localeCompare(a.start_month);
  const current = periods.filter(isActivePeriod).sort(by_start_desc);
  const past = periods.filter((p) => !isActivePeriod(p)).sort(by_start_desc);

  return (
    <>
      <IonList>
        {can_edit && (
          <IonItem button detail={false} onClick={() => set_modal("add")}>
            <IonIcon icon={addCircleOutline} slot="start" color="primary" />
            <IonLabel>Add Pioneer Period</IonLabel>
          </IonItem>
        )}
        <PioneerPeriodGroup
          title="Current Pioneers"
          periods={current}
          name_of={name_of}
          editable={can_edit}
          on_edit={set_modal}
        />
        <PioneerPeriodGroup
          title="Past Periods"
          periods={past}
          name_of={name_of}
          editable={can_edit}
          on_edit={set_modal}
        />
      </IonList>
      <PioneerPeriodModal
        is_open={modal !== null}
        on_dismiss={() => set_modal(null)}
        period={modal === "add" ? undefined : (modal ?? undefined)}
        periods={periods}
      />
    </>
  );
}
