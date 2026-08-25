import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MeetingAttendanceHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/meeting-attendance/meeting-attendance-header/MeetingAttendanceHeader";
import { MeetingAttendanceContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/meeting-attendance/meeting-attendance-content/MeetingAttendanceContent";

function MeetingAttendancePage() {
  const [show_add_modal, setShowAddModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <MeetingAttendanceHeader on_add={() => setShowAddModal(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <MeetingAttendanceContent
          show_add_modal={show_add_modal}
          on_dismiss_add_modal={() => setShowAddModal(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default MeetingAttendancePage;
