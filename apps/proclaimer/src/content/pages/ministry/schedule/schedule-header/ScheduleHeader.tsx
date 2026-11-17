import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { EditIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/edit/EditIconButton";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { ScheduleEditModal } from "../schedule-edit-modal/ScheduleEditModal";

export function ScheduleHeader() {
  const [show_edit, set_show_edit] = useState(false);
  const { has_service_overseer, has_congregation_admin, is_super_admin } = usePermissions();
  const can_edit = has_service_overseer || has_congregation_admin || is_super_admin;

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Schedule</IonTitle>
      {can_edit && (
        <IonButtons slot="end">
          <EditIconButton on_click={() => set_show_edit(true)} />
        </IonButtons>
      )}
      <ScheduleEditModal is_open={show_edit} on_dismiss={() => set_show_edit(false)} />
    </IonToolbar>
  );
}
