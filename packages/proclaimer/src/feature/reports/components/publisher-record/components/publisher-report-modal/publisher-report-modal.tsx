import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonList, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { MonthNavigation } from "@amodeo/proclaimer/ui/components/navigation/month-navigation/MonthNavigation";
import type { Report } from "../../../../schemas/report.ts";
import { ReportForm } from "./components/report-form/report-form.tsx";

interface PublisherReportModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_name: string;
  confidential_id: string;
  group_id: string | null;
  date: string;
  reports: Report[];
  is_loading: boolean;
}

export function PublisherReportModal({
  is_open,
  on_dismiss,
  publisher_name,
  confidential_id,
  group_id,
  date,
  reports,
  is_loading,
}: PublisherReportModalProps) {
  const [month, set_month] = useState(date.slice(0, 7));
  const selected_date = `${month}-01`;
  const existing_report = reports.find((r) => r.date.slice(0, 7) === month);

  return (
    <ResponsiveModal
      isOpen={is_open}
      onWillPresent={() => set_month(date.slice(0, 7))}
      onDidDismiss={on_dismiss}
    >
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
          <MonthNavigation month={month} on_change={set_month} />
          <ReportForm
            key={month}
            confidential_id={confidential_id}
            group_id={group_id}
            date={selected_date}
            existing_report={existing_report}
            is_loading={is_loading}
            on_save={on_dismiss}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
