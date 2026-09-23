import { IonList } from "@ionic/react";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { DeleteIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/delete/DeleteIconButton";
import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";

interface WeekendAssignedPublisherProps {
  label: string;
  assignee: Publisher | undefined;
  on_delete: () => void;
}

export function WeekendAssignedPublisher({
  label,
  assignee,
  on_delete,
}: WeekendAssignedPublisherProps) {
  if (!assignee) return null;

  return (
    <IonList>
      <LabelValueItem
        label={label}
        value={getPublisherDisplayName(assignee)}
        end_detail={
          <DeleteIconButton
            alert_header="Remove Assignment"
            alert_message="Remove this publisher from the assignment?"
            confirm_text="Remove"
            on_click={on_delete}
          />
        }
      />
    </IonList>
  );
}
