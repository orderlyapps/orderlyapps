import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../participant-publishers-list/ParticipantPublishersList.tsx";

export function TreasuresContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Treasures
      </Heading>
      <ParticipantPublishersList participation_id="treasures" />
    </div>
  );
}
