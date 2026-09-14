import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../participant-publishers-list/ParticipantPublishersList.tsx";

export function TalkContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Talk
      </Heading>
      <ParticipantPublishersList participation_id="talk" />
    </div>
  );
}
