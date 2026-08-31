import { IonSpinner, IonList, IonItem, IonLabel, IonButton } from "@ionic/react";
import { ResponsiveModal } from "../../../../../../ui/components/display/responsive-modal/ResponsiveModal.tsx";

interface ServiceYearSelectModalProps {
  is_open: boolean;
  is_generating: boolean;
  on_close: () => void;
  on_select_current_previous: () => void;
  on_select_previous_two: () => void;
}

export function ServiceYearSelectModal({
  is_open,
  is_generating,
  on_close,
  on_select_current_previous,
  on_select_previous_two,
}: ServiceYearSelectModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_close} fullscreen={false}>
      <IonList>
        <IonItem button detail onClick={on_select_current_previous} disabled={is_generating}>
          <IonLabel>
            <h2>Current &amp; Previous Service Year</h2>
            <p>Download reports for the current and previous service years</p>
          </IonLabel>
        </IonItem>
        <IonItem button detail onClick={on_select_previous_two} disabled={is_generating}>
          <IonLabel>
            <h2>Previous Two Service Years</h2>
            <p>Download reports for the two service years before the current one</p>
          </IonLabel>
        </IonItem>
      </IonList>
      {is_generating && (
        <div style={{ display: "flex", justifyContent: "center", padding: 16 }}>
          <IonSpinner name="crescent" />
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}>
        <IonButton fill="clear" onClick={on_close} disabled={is_generating}>
          Cancel
        </IonButton>
      </div>
    </ResponsiveModal>
  );
}
