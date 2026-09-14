import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../participant-publishers-list/ParticipantPublishersList.tsx";

export function PrayerContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Prayer
      </Heading>
      <ParticipantPublishersList participation_id="prayer" />
    </div>
  );
}
