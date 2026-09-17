import { IonButtons, IonContent, IonHeader, IonList, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { PeriodForm } from "./components/period-form/period-form.tsx";
import type { RegularPioneer } from "../../schemas/regular-pioneer.ts";

interface PioneerPeriodModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  period?: RegularPioneer;
  publisher_id?: string;
  periods: RegularPioneer[];
}

export function PioneerPeriodModal({
  is_open,
  on_dismiss,
  period,
  publisher_id,
  periods,
}: PioneerPeriodModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{period ? "Edit Pioneer Period" : "Add Pioneer Period"}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <PeriodForm
            key={period?.id ?? publisher_id ?? "add"}
            period={period}
            fixed_publisher_id={publisher_id ?? period?.publisher_id}
            periods={periods}
            on_save={on_dismiss}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
