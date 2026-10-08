import { useLiveQuery } from "@tanstack/react-db";
import { IonCol, IonGrid, IonList, IonRow } from "@ionic/react";
import { WeekNavigation } from "@amodeo/proclaimer/ui/components/navigation/week-navigation/WeekNavigation";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { avAssignmentCollection } from "../../../collections/av-assignment.ts";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { AvAssignment } from "../../../schemas/av-assignment.ts";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { getAvAssignmentRows } from "../../../utils/get-av-assignment-rows.ts";
import { AvAssignmentCard } from "../av-assignment-card/AvAssignmentCard.tsx";
import type { AvAssignmentGroup } from "../../../utils/types.ts";

export interface AvScheduleContentProps {
  week_id: string;
  base_path: string;
}

export function AvScheduleContent({ week_id, base_path }: AvScheduleContentProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: allAssignments } = useLiveQuery((q) => q.from({ aa: avAssignmentCollection }));
  const { data: allPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const is_loading = allAssignments === undefined || allPublishers === undefined;

  if (is_loading) return <Spinner className="flex-center" />;

  const assignments = ((allAssignments as AvAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  const publishers = ((allPublishers as Publisher[] | undefined) ?? []).filter(
    (p) => !congregation_id || p.congregation_id === congregation_id,
  );

  const rows = getAvAssignmentRows(week_id, base_path, assignments, publishers);

  const starts_new_row = (row: AvAssignmentGroup) =>
    row.is_header || row.id.startsWith("video") || row.id.startsWith("entrance");

  const groups = rows.reduce<AvAssignmentGroup[][]>((groups, row) => {
    const last = groups[groups.length - 1];
    if (!last || starts_new_row(row)) {
      groups.push([row]);
    } else {
      last.push(row);
    }
    return groups;
  }, []);

  return (
    <>
      <WeekNavigation week_id={week_id} />
      <IonList inset>
        <IonGrid>
          {groups.map((group) => (
            <IonRow key={group[0].id}>
              {group.map((row) => (
                <IonCol key={row.id} size="12" sizeMd="6" sizeLg="4" sizeXl="3">
                  <AvAssignmentCard {...row} />
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>
      </IonList>
    </>
  );
}
