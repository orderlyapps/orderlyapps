import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { MidweekMeetingParticipantPublishersList } from "../midweek-meeting-participant-publishers-list/MidweekMeetingParticipantPublishersList.tsx";
import type { MidweekMeetingParticipation } from "../../../schemas/midweek-meeting-participation.ts";

interface MidweekMeetingParticipationTypeContentProps {
  participation_id: MidweekMeetingParticipation["participation_id"];
  label: string;
}

export function MidweekMeetingParticipationTypeContent({
  participation_id,
  label,
}: MidweekMeetingParticipationTypeContentProps) {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        {label}
      </Heading>
      <MidweekMeetingParticipantPublishersList participation_id={participation_id} />
    </div>
  );
}
