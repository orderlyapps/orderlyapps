import { useLiveQuery } from "@tanstack/react-db";
import { WeekNavigation } from "@amodeo/proclaimer/ui/components/navigation/week-navigation/WeekNavigation";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { IonList } from "@ionic/react";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { midweekMeetingDataCollection } from "../../../collections/midweek-meeting-data.ts";
import { midweekAssignmentCollection } from "../../../collections/midweek-assignment.ts";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { MidweekMeetingData } from "../../../schemas/midweek-meeting-data.ts";
import type { MidweekAssignment } from "../../../schemas/midweek-assignment.ts";
import { AssignmentCard } from "./components/assignment-card/AssignmentCard.tsx";
import { getMeetingParts } from "../../../utils/get-meeting-parts.ts";
import { useCircuitVisitEvent } from "./components/event-banners/hooks/use-circuit-visit-event.ts";
import { useAssignmentRows } from "./hooks/use-assignment-rows.ts";
import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import type { ScheduleContentProps, AssignmentRow } from "./types.ts";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { CircuitVisitBanner } from "./components/event-banners/circuit-visit-banner/CircuitVisitBanner.tsx";
import { CircuitAssemblyBanner } from "./components/event-banners/circuit-assembly-banner/CircuitAssemblyBanner.tsx";
import { ConventionBanner } from "./components/event-banners/convention-banner/ConventionBanner.tsx";

export function ScheduleContent({ week_id, base_path }: ScheduleContentProps) {
  const permissions = usePermissions();
  const can_edit = permissions.has_clam_overseer;

  const { data: allMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );

  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));

  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const meetingData = (allMeetingData as MidweekMeetingData[] | undefined)?.filter(
    (m) => m.week_id === week_id,
  );
  const weekData = meetingData?.[0];
  const assignments = (allAssignments as MidweekAssignment[] | undefined)?.filter(
    (a) => a.week_id === week_id,
  );

  const show_school_2 = assignments?.some((a) => a.assignment_id === "chairman_2") ?? false;

  const { event: circuit_visit_event, is_loading: events_loading } = useCircuitVisitEvent(week_id);

  const midweek_theme = circuit_visit_event?.details?.midweek_theme ?? "";
  const overseer = (publishers as Publisher[] | undefined)?.find(
    (p) => p.id === circuit_visit_event?.name,
  );
  const circuit_visit = circuit_visit_event
    ? {
        theme: midweek_theme || "Theme: TBC",
        overseer_name: overseer ? getPublisherDisplayName(overseer) : undefined,
      }
    : undefined;

  const meetingParts = weekData
    ? getMeetingParts(weekData, assignments, show_school_2, circuit_visit, can_edit)
    : [];

  const rows = useAssignmentRows(
    meetingParts,
    assignments,
    publishers as Publisher[] | undefined,
    week_id,
    base_path,
  );

  const is_loading =
    allMeetingData === undefined ||
    allAssignments === undefined ||
    publishers === undefined ||
    events_loading;

  if (is_loading) return <Spinner className="flex-center" />;

  return (
    <>
      <WeekNavigation week_id={week_id} />
      <CircuitVisitBanner event={circuit_visit_event} />
      <CircuitAssemblyBanner week_id={week_id} />
      <ConventionBanner week_id={week_id} />

      <IonList inset>
        <MultiColumnList<AssignmentRow>
          items={rows}
          get_id={(row) => row.id}
          render_item={(row) => <AssignmentCard {...row} />}
          pin_to_first_column={(row) => row.pin_to_first_column ?? false}
        />
        {!show_school_2 && can_edit && !circuit_visit_event && (
          <>
            <Space />
            <TextButton
              label="Add Second School"
              routerLink={`${base_path}/${week_id}/assignment/chairman_2`}
            />
          </>
        )}
      </IonList>
    </>
  );
}
