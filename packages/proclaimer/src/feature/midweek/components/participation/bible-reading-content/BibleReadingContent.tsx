import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../participant-publishers-list/ParticipantPublishersList.tsx";

export function BibleReadingContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Bible Reading
      </Heading>
      <ParticipantPublishersList participation_id="bible_reading" />
    </div>
  );
}
