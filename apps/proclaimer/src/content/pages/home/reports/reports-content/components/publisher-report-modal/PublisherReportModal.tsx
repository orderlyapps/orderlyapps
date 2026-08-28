import { IonButtons, IonContent, IonHeader, IonList, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import type { Report } from "@amodeo/proclaimer/database/schemas/report";
import { ReportForm } from "./components/report-form/ReportForm";

interface PublisherReportModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_name: string;
  confidential_id: string;
  group_id: string | null;
  date: string;
  existing_report: Report | undefined;
}

export function PublisherReportModal({
  is_open,
  on_dismiss,
  publisher_name,
  confidential_id,
  group_id,
  date,
  existing_report,
}: PublisherReportModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{publisher_name}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <ReportForm
            confidential_id={confidential_id}
            group_id={group_id}
            date={date}
            existing_report={existing_report}
            on_save={on_dismiss}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
