import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@amodeo/proclaimer/feature/event";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";

interface ConventionItemProps {
  event: EventRow;
  edit_href?: string;
}

export function ConventionItem({ event, edit_href }: ConventionItemProps) {
  return (
    <LabelValueItem
      value="Convention"
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
