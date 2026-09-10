import { IonItem, IonLabel, IonList } from "@ionic/react";
import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { format } from "date-fns";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { eventCollection } from "../../collections/event.ts";
import { groupEventsByMonth } from "../../utils/groupEventsByMonth.ts";
import { EventMonthGroup } from "../event-month-group/EventMonthGroup.tsx";

interface EventsListProps {
  edit_href?: (event_id: string) => string;
}

export function EventsList({ edit_href }: EventsListProps) {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const today_str = format(new Date(), "yyyy-MM-dd");

  const { data: events } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ e: eventCollection })
            .where(({ e }) =>
              and(eq(e.congregation_id, congregation_id), gte(e.start_date, today_str)),
            )
            .orderBy(({ e }) => e.start_date)
        : undefined,
    [congregation_id, today_str],
  );

  if (!events?.length) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel>
            <Body>No events</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <>
      {groupEventsByMonth(events).map((group) => (
        <EventMonthGroup key={group.label} group={group} edit_href={edit_href} />
      ))}
      <Space />
    </>
  );
}
