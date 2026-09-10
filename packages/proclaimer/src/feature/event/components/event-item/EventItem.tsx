import type { EventRow } from "../../schemas/event.ts";
import { CircuitAssemblyItem } from "./components/circuit-assembly-item/CircuitAssemblyItem.tsx";
import { ConventionItem } from "./components/convention-item/ConventionItem.tsx";
import { MemorialItem } from "./components/memorial-item/MemorialItem.tsx";
import { CircuitVisitItem } from "./components/circuit-visit-item/CircuitVisitItem.tsx";
import { SpecialMeetingItem } from "./components/special-meeting-item/SpecialMeetingItem.tsx";
import { SpecialTalkItem } from "./components/special-talk-item/SpecialTalkItem.tsx";
import { CampaignItem } from "./components/campaign-item/CampaignItem.tsx";
import { OtherEventItem } from "./components/other-event-item/OtherEventItem.tsx";

interface EventItemProps {
  event: EventRow;
  edit_href?: string;
}

export function EventItem({ event, edit_href }: EventItemProps) {
  switch (event.type) {
    case "circuit_assembly":
      return <CircuitAssemblyItem event={event} edit_href={edit_href} />;
    case "convention":
      return <ConventionItem event={event} edit_href={edit_href} />;
    case "memorial":
      return <MemorialItem event={event} edit_href={edit_href} />;
    case "circuit_visit":
      return <CircuitVisitItem event={event} edit_href={edit_href} />;
    case "special_meeting":
      return <SpecialMeetingItem event={event} edit_href={edit_href} />;
    case "special_talk":
      return <SpecialTalkItem event={event} edit_href={edit_href} />;
    case "campaign":
      return <CampaignItem event={event} edit_href={edit_href} />;
    case "other":
      return <OtherEventItem event={event} edit_href={edit_href} />;
  }
}
