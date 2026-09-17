import { useState } from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { usePioneerPeriods } from "../../hooks/use-pioneer-periods.ts";
import { PioneerPeriodItem } from "../pioneer-period-item/pioneer-period-item.tsx";
import { PioneerPeriodModal } from "../pioneer-period-modal/pioneer-period-modal.tsx";
import type { RegularPioneer } from "../../schemas/regular-pioneer.ts";

interface PublisherPioneerSectionProps {
  publisher_id: string;
  read_only?: boolean;
}

export function PublisherPioneerSection({
  publisher_id,
  read_only = false,
}: PublisherPioneerSectionProps) {
  const { periods } = usePioneerPeriods(publisher_id);
  const { has_secretary, has_congregation_admin, is_super_admin } = usePermissions();
  const can_edit = !read_only && (has_secretary || has_congregation_admin || is_super_admin);
  const [modal, set_modal] = useState<"add" | RegularPioneer | null>(null);

  if (periods.length === 0 && !can_edit) return null;

  const sorted = [...periods].sort((a, b) => b.start_month.localeCompare(a.start_month));
  const editing = modal === "add" ? undefined : (modal ?? undefined);

  return (
    <>
      <IonItem lines="none">
        <Body size="sm" color="medium" bold>
          Regular Pioneer Service
        </Body>
      </IonItem>
      {can_edit && (
        <IonItem button detail={false} onClick={() => set_modal("add")}>
          <IonIcon icon={addCircleOutline} slot="start" color="primary" />
          <IonLabel>Add Pioneer Period</IonLabel>
        </IonItem>
      )}
      {sorted.map((p) => (
        <PioneerPeriodItem key={p.id} period={p} editable={can_edit} on_edit={set_modal} />
      ))}
      <PioneerPeriodModal
        is_open={modal !== null}
        on_dismiss={() => set_modal(null)}
        period={editing}
        publisher_id={publisher_id}
        periods={periods}
      />
    </>
  );
}
