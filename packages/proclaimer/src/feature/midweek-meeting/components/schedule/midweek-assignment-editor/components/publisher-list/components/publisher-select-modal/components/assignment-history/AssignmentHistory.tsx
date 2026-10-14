import { IonList } from "@ionic/react";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { differenceInWeeks, parseISO } from "date-fns";
import type { MidweekMeetingAssignment } from "../../../../../../../../../schemas/midweek-meeting-assignment.ts";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { participationTypeMap } from "../../../../../midweek-publisher-selector/utils/participation-type-map.ts";

interface AssignmentHistoryProps {
  publisher_id: string;
  week_id: string;
  all_assignments: MidweekMeetingAssignment[];
  publishers: Publisher[];
}

interface AssignmentHistoryRow {
  week_id: string;
  assignment_id: string;
  weeks_away: number;
  is_future: boolean;
  is_current: boolean;
  partner_name: string | null;
  partner_preposition: "with" | "for" | null;
}

function getAssignmentTypeLabel(assignment_id: string): string {
  const type = participationTypeMap[assignment_id as keyof typeof participationTypeMap];
  if (!type) return assignment_id.replace(/_/g, " ");
  return type.replace(/_/g, " ");
}

function getPartnerAssignment(
  assignment_id: string,
): { assignment_id: string; preposition: "with" | "for" } | null {
  const apply_match = assignment_id.match(/^(school_\d)_apply_(\d)$/);
  if (apply_match) {
    return {
      assignment_id: `${apply_match[1]}_assistant_${apply_match[2]}`,
      preposition: "with",
    };
  }
  const assistant_match = assignment_id.match(/^(school_\d)_assistant_(\d)$/);
  if (assistant_match) {
    return {
      assignment_id: `${assistant_match[1]}_apply_${assistant_match[2]}`,
      preposition: "for",
    };
  }
  if (assignment_id === "cbs_conductor") {
    return { assignment_id: "cbs_reader", preposition: "with" };
  }
  if (assignment_id === "cbs_reader") {
    return { assignment_id: "cbs_conductor", preposition: "for" };
  }
  return null;
}

export function AssignmentHistory({
  publisher_id,
  week_id,
  all_assignments,
  publishers,
}: AssignmentHistoryProps) {
  const current_date = parseISO(week_id);

  const publisher_assignments = all_assignments.filter((a) => a.participant_id === publisher_id);

  const past = publisher_assignments
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 5);

  const current = publisher_assignments.filter((a) => a.week_id === week_id);

  const future = publisher_assignments
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id));

  const rows: AssignmentHistoryRow[] = [...past.reverse(), ...current, ...future].map((a) => {
    const a_date = parseISO(a.week_id);
    const diff = differenceInWeeks(a_date, current_date);
    const is_current = a.week_id === week_id;
    const is_future = a.week_id > week_id;

    const partner_assignment = getPartnerAssignment(a.assignment_id);
    let partner_name: string | null = null;
    let partner_preposition: "with" | "for" | null = null;
    if (partner_assignment) {
      const partner_record = all_assignments.find(
        (x) => x.week_id === a.week_id && x.assignment_id === partner_assignment.assignment_id,
      );
      const partner_publisher = partner_record
        ? publishers.find((p) => p.id === partner_record.participant_id)
        : undefined;
      if (partner_publisher) {
        partner_name = `${partner_publisher.first_name} ${partner_publisher.last_name}`;
        partner_preposition = partner_assignment.preposition;
      }
    }

    return {
      week_id: a.week_id,
      assignment_id: a.assignment_id,
      weeks_away: Math.abs(diff),
      is_future,
      is_current,
      partner_name,
      partner_preposition,
    };
  });

  if (rows.length === 0) return null;

  return (
    <IonList inset>
      {rows.map((row, i) => {
        const weeks_label = row.is_current
          ? "This week"
          : row.is_future
            ? `In ${row.weeks_away}w`
            : `${row.weeks_away}w ago`;

        return (
          <LabelValueItem
            key={`${row.week_id}-${row.assignment_id}-${i}`}
            label={weeks_label}
            label_size={row.is_current ? "xl" : undefined}
            label_color={row.is_current ? "primary" : undefined}
            value_color={row.is_current ? "primary" : row.is_future ? "medium" : undefined}
            value={
              getAssignmentTypeLabel(row.assignment_id).replace(/\b\w/g, (c) => c.toUpperCase()) +
              `${row.partner_name ? ` ${row.partner_preposition} ${row.partner_name}` : ""}`
            }
          />
        );
      })}
    </IonList>
  );
}
