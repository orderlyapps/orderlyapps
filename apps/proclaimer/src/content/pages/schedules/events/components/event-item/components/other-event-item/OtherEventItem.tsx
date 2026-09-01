import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@amodeo/proclaimer/feature/event";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";

interface OtherEventItemProps {
  event: EventRow;
  edit_href?: string;
}

export function OtherEventItem({ event, edit_href }: OtherEventItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value={event.name || "Other"}
      value_2={event.description || undefined}
      router_link={edit_href}
    />
  );
}
