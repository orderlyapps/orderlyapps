import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "../../../../schemas/event.ts";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";

interface PioneerMeetingItemProps {
  event: EventRow;
  edit_href?: string;
}

export function PioneerMeetingItem({ event, edit_href }: PioneerMeetingItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value="Pioneer Meeting"
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
