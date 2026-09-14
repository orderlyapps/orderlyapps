import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../participant-publishers-list/ParticipantPublishersList.tsx";

export function GemsContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Gems
      </Heading>
      <ParticipantPublishersList participation_id="gems" />
    </div>
  );
}
