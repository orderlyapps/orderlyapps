import { IonList } from "@ionic/react";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { ScheduleContent } from "../schedule-content/ScheduleContent.tsx";
import { MidweekAssignmentsDisplay } from "./components/midweek-assignments-display/MidweekAssignmentsDisplay.tsx";
import { MidweekAttendantsDisplay } from "./components/midweek-attendants-display/MidweekAttendantsDisplay.tsx";

interface MidweekMeetingContentProps {
  week_id: string;
  base_path: string;
}

export function MidweekMeetingContent({ week_id, base_path }: MidweekMeetingContentProps) {
  return (
    <>
      <ScheduleContent week_id={week_id} base_path={base_path} />
      <IonList inset>
        <Space />
        <MidweekAssignmentsDisplay week_id={week_id} />
        <Space />
        <MidweekAttendantsDisplay week_id={week_id} />
      </IonList>
    </>
  );
}
