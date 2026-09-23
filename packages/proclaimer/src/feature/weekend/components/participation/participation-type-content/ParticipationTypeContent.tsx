import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { WeekendParticipantPublishersList } from "../weekend-participant-publishers-list/WeekendParticipantPublishersList.tsx";

interface ParticipationTypeContentProps {
  participation_id: string;
  label: string;
}

export function ParticipationTypeContent({
  participation_id,
  label,
}: ParticipationTypeContentProps) {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        {label}
      </Heading>
      <WeekendParticipantPublishersList participation_id={participation_id} />
    </div>
  );
}
