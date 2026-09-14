import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../participant-publishers-list/ParticipantPublishersList.tsx";

export function CbsConductorContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        CBS Conductor
      </Heading>
      <ParticipantPublishersList participation_id="cbs_conductor" />
    </div>
  );
}
