import { useLiveQuery } from "@tanstack/react-db";
import { addWeeks, format, parseISO, startOfWeek } from "date-fns";
import { midweekMeetingDataCollection } from "../../../../../collections/midweek-meeting-data.ts";
import { midweekMeetingAssignmentCollection } from "../../../../../collections/midweek-meeting-assignment.ts";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { MidweekMeetingData } from "../../../../../schemas/midweek-meeting-data.ts";
import type { MidweekMeetingAssignment } from "../../../../../schemas/midweek-meeting-assignment.ts";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { chairmansOutlineDocx } from "../../docx/chairmans-outline-docx.ts";
import { DocxDownloadButton } from "../docx-download-button/DocxDownloadButton.tsx";

interface ChairmansOutlineDownloadButtonsProps {
  week_ids: string[];
}

export function ChairmansOutlineDownloadButtons({
  week_ids,
}: ChairmansOutlineDownloadButtonsProps) {
  const { data: allMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );
  const { data: allAssignments } = useLiveQuery((q) =>
    q.from({ ma: midweekMeetingAssignmentCollection }),
  );
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  if (allMeetingData === undefined || allAssignments === undefined || publishers === undefined) {
    return <Spinner size="sm" centered={false} />;
  }

  return (
    <>
      {week_ids.map((week_id) => {
        const meetingData = (allMeetingData as MidweekMeetingData[] | undefined)?.find(
          (m) => m.week_id === week_id,
        );
        const assignments = (allAssignments as MidweekMeetingAssignment[] | undefined)?.filter(
          (a) => a.week_id === week_id,
        );
        const next_week_id = format(
          startOfWeek(addWeeks(parseISO(week_id), 1), { weekStartsOn: 1 }),
          "yyyy-MM-dd",
        );
        const nextMeetingData = (allMeetingData as MidweekMeetingData[] | undefined)?.find(
          (m) => m.week_id === next_week_id,
        );
        const nextAssignments = (allAssignments as MidweekMeetingAssignment[] | undefined)?.filter(
          (a) => a.week_id === next_week_id,
        );

        const doc = chairmansOutlineDocx(
          week_id,
          meetingData,
          assignments,
          publishers as Publisher[] | undefined,
          nextMeetingData,
          nextAssignments,
        );

        const week_label = getTheocraticWeekLabel(week_id, {
          format: "week-range",
          useRelativeWeek: true,
        });

        return (
          <DocxDownloadButton
            key={week_id}
            doc={doc}
            fileName={`Chairman's Outline - ${week_label}.docx`}
            label={week_ids.length > 1 ? week_label : "Outline"}
          />
        );
      })}
    </>
  );
}
