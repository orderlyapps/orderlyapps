import { WeekNavigation } from "@amodeo/proclaimer/ui/components/navigation/week-navigation/WeekNavigation";
import { IonList } from "@ionic/react";
// TODO: Create WeekEvents component or remove if not needed
// import { WeekEvents } from "@feature/db/shared/week-events/WeekEvents";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { WeekendMeetingDisplay } from "./components/weekend-meeting-display/WeekendMeetingDisplay.tsx";
import { WeekendAssignmentsDisplay } from "./components/weekend-assignments-display/WeekendAssignmentsDisplay.tsx";
import { WeekendAttendantsDisplay } from "./components/weekend-attendants-display/WeekendAttendantsDisplay.tsx";
import { WeekendAssignmentsOtherDisplay } from "./components/weekend-assignments-other-display/WeekendAssignmentsOtherDisplay.tsx";
import { OutgoingSpeakersDisplay } from "./components/outgoing-speakers-display/OutgoingSpeakersDisplay.tsx";

type WeekendMeetingContentProps = {
  week_id: string;
};

export function WeekendMeetingContent({ week_id }: WeekendMeetingContentProps) {
  return (
    <>
      <WeekNavigation week_id={week_id} />
      <IonList className="ion-margin" inset>
        {/* <WeekEvents weekId={week_id} meetingType="weekend" /> */}
        <WeekendMeetingDisplay week_id={week_id} />
        <Space />
        <WeekendAssignmentsOtherDisplay week_id={week_id} />
        <Space />
        <WeekendAssignmentsDisplay week_id={week_id} />
        <Space />
        <WeekendAttendantsDisplay week_id={week_id} />
        <Space />
        <OutgoingSpeakersDisplay week_id={week_id} />
      </IonList>
    </>
  );
}
