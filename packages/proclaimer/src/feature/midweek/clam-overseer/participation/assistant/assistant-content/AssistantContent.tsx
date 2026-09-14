import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "../../shared/components/participant-publishers-list/ParticipantPublishersList.tsx";

export function AssistantContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Assistant
      </Heading>
      <ParticipantPublishersList participation_id="assistant" />
    </div>
  );
}
