import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "../../../../schemas/event.ts";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";

interface KingdomMinistrySchoolItemProps {
  event: EventRow;
  edit_href?: string;
}

export function KingdomMinistrySchoolItem({ event, edit_href }: KingdomMinistrySchoolItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value="Kingdom Ministry School"
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
