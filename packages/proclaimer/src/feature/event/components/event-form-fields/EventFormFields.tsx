import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { eventTypeSchema } from "../../schemas/event.ts";
import type { EventFormFieldProps } from "./types.ts";
import { CircuitAssemblyForm } from "./components/circuit-assembly-form/CircuitAssemblyForm.tsx";
import { ConventionForm } from "./components/convention-form/ConventionForm.tsx";
import { MemorialForm } from "./components/memorial-form/MemorialForm.tsx";
import { CircuitVisitForm } from "./components/circuit-visit-form/CircuitVisitForm.tsx";
import { SpecialMeetingForm } from "./components/special-meeting-form/SpecialMeetingForm.tsx";
import { CampaignForm } from "./components/campaign-form/CampaignForm.tsx";
import { SpecialTalkForm } from "./components/special-talk-form/SpecialTalkForm.tsx";
import { PioneerMeetingForm } from "./components/pioneer-meeting-form/PioneerMeetingForm.tsx";
import { KingdomMinistrySchoolForm } from "./components/kingdom-ministry-school-form/KingdomMinistrySchoolForm.tsx";
import { WorkingBeeForm } from "./components/working-bee-form/WorkingBeeForm.tsx";
import { BethelSpeakerForm } from "./components/bethel-speaker-form/BethelSpeakerForm.tsx";
import { OtherEventForm } from "./components/other-event-form/OtherEventForm.tsx";

const EVENT_TYPE_OPTIONS = eventTypeSchema.options.map((value) => ({
  label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  value,
}));

export function EventFormFields(props: EventFormFieldProps) {
  const { on_change } = props;

  function renderTypeForm() {
    switch (props.type) {
      case "circuit_assembly":
        return <CircuitAssemblyForm {...props} />;
      case "convention":
        return <ConventionForm {...props} />;
      case "memorial":
        return <MemorialForm {...props} />;
      case "circuit_visit":
        return <CircuitVisitForm {...props} />;
      case "special_meeting":
        return <SpecialMeetingForm {...props} />;
      case "campaign":
        return <CampaignForm {...props} />;
      case "special_talk":
        return <SpecialTalkForm {...props} />;
      case "pioneer_meeting":
        return <PioneerMeetingForm {...props} />;
      case "kingdom_ministry_school":
        return <KingdomMinistrySchoolForm {...props} />;
      case "working_bee":
        return <WorkingBeeForm {...props} />;
      case "bethel_speaker":
        return <BethelSpeakerForm {...props} />;
      default:
        return <OtherEventForm {...props} />;
    }
  }

  return (
    <>
      <Select
        label="Event"
        value={props.type}
        options={EVENT_TYPE_OPTIONS}
        placeholder="Select an event type"
        on_change={(v) => on_change("type", v as string)}
        interface_type="popover"
      />
      {props.type && renderTypeForm()}
    </>
  );
}
