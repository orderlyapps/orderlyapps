import { eq, useLiveQuery } from "@tanstack/react-db";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { groupCollection } from "@amodeo/proclaimer/feature/group";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { cleanMajorCollection } from "../../collections/clean-major.ts";
import { cleanMinorCollection } from "../../collections/clean-minor.ts";
import { groupCleaningByMonth } from "../../utils/groupCleaningByMonth.ts";
import { CleaningMonthGroup } from "../cleaning-month-group/CleaningMonthGroup.tsx";

export function CleaningList() {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: major_entries } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ cm: cleanMajorCollection })
            .where(({ cm }) => eq(cm.congregation_id, congregation_id))
            .orderBy(({ cm }) => cm.week_id)
        : undefined,
    [congregation_id],
  );

  const { data: minor_entries } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ cm: cleanMinorCollection })
            .where(({ cm }) => eq(cm.congregation_id, congregation_id))
            .orderBy(({ cm }) => cm.week_id)
        : undefined,
    [congregation_id],
  );

  const { data: groups } = useLiveQuery(
    (q) =>
      congregation_id
        ? q.from({ g: groupCollection }).where(({ g }) => eq(g.congregation_id, congregation_id))
        : undefined,
    [congregation_id],
  );

  const is_loading =
    major_entries === undefined || minor_entries === undefined || groups === undefined;

  const group_map = new Map(groups?.map((g) => [g.id ?? "", g.name]) ?? []);

  const combined = [
    ...(major_entries?.map((e) => ({ ...e, type: "major" as const })) ?? []),
    ...(minor_entries?.map((e) => ({ ...e, type: "minor" as const })) ?? []),
  ].sort((a, b) => a.week_id.localeCompare(b.week_id));

  if (is_loading) {
    return <Spinner className="flex-center" />;
  }

  if (!combined.length) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel>
            <Body>No cleaning assignments</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const month_groups = groupCleaningByMonth(combined);

  return (
    <>
      {month_groups.map((group) => (
        <CleaningMonthGroup key={group.label} group={group} group_map={group_map} />
      ))}
    </>
  );
}
