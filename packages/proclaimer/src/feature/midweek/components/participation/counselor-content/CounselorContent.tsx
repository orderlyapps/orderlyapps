import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../participant-publishers-list/ParticipantPublishersList.tsx";

export function CounselorContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Counselor
      </Heading>
      <ParticipantPublishersList participation_id="counselor" />
    </div>
  );
}
