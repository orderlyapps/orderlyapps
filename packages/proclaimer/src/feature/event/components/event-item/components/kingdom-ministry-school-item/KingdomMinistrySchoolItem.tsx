import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "../../../../schemas/event.ts";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { formatTime } from "@amodeo/proclaimer/util/date/formatTime";

interface KingdomMinistrySchoolItemProps {
  event: EventRow;
  edit_href?: string;
}

export function KingdomMinistrySchoolItem({ event, edit_href }: KingdomMinistrySchoolItemProps) {
  const detail_parts = [event.address, event.start_time ? formatTime(event.start_time) : ""].filter(
    Boolean,
  );
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value={event.name}
      value_2={detail_parts.join(" | ")}
      router_link={edit_href}
    />
  );
}
