import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { MidweekPdfAssignmentRow } from "../midweek-pdf-assignment-row/MidweekPdfAssignmentRow.tsx";
import { getPublisherDisplayNameOrEmpty } from "../../../../../utils/get-publisher-display-name-or-empty.ts";
import type { WeekScheduleData } from "../../../../../hooks/use-midweek-meeting-schedule-data.ts";

const styles = StyleSheet.create({
  heading: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 2,
    color: "#666",
  },
  section: {
    marginBottom: 10,
    fontSize: 10,
  },
});

type SecondSchoolSectionProps = {
  readonly week: WeekScheduleData;
  readonly highlightPublisherId?: string;
};

export function SecondSchoolSection({ week, highlightPublisherId }: SecondSchoolSectionProps) {
  const { meetingData, assignments } = week;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Second School</Text>

      <MidweekPdfAssignmentRow
        assignmentId="chairman_2"
        title="Counselor"
        participant={getPublisherDisplayNameOrEmpty(assignments.get("chairman_2"))}
        participantId={assignments.get("chairman_2")?.id}
        highlightPublisherId={highlightPublisherId}
      />

      <MidweekPdfAssignmentRow
        assignmentId="tgw_bread"
        title={meetingData.mwb_tgw_bread_title ?? "Bible Reading"}
        participant={getPublisherDisplayNameOrEmpty(assignments.get("school_2_bible_reading"))}
        participantId={assignments.get("school_2_bible_reading")?.id}
        highlightPublisherId={highlightPublisherId}
      />

      {meetingData.mwb_ayf_part1 && (
        <MidweekPdfAssignmentRow
          assignmentId="ayf_part1"
          title={`${meetingData.mwb_ayf_part1_title ?? meetingData.mwb_ayf_part1}${meetingData.mwb_ayf_part1_time ? ` (${meetingData.mwb_ayf_part1_time} min)` : ""}`}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("school_2_apply_1"))}
          participantId={assignments.get("school_2_apply_1")?.id}
          assistantOrReader={getPublisherDisplayNameOrEmpty(
            assignments.get("school_2_assistant_1"),
          )}
          assistantId={assignments.get("school_2_assistant_1")?.id}
          assistantLabel="Assistants"
          highlightPublisherId={highlightPublisherId}
        />
      )}
      {meetingData.mwb_ayf_part2 && (
        <MidweekPdfAssignmentRow
          assignmentId="ayf_part2"
          title={`${meetingData.mwb_ayf_part2_title ?? meetingData.mwb_ayf_part2}${meetingData.mwb_ayf_part2_time ? ` (${meetingData.mwb_ayf_part2_time} min)` : ""}`}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("school_2_apply_2"))}
          participantId={assignments.get("school_2_apply_2")?.id}
          assistantOrReader={getPublisherDisplayNameOrEmpty(
            assignments.get("school_2_assistant_2"),
          )}
          assistantId={assignments.get("school_2_assistant_2")?.id}
          assistantLabel="Assistant"
          highlightPublisherId={highlightPublisherId}
        />
      )}
      {meetingData.mwb_ayf_part3 && (
        <MidweekPdfAssignmentRow
          assignmentId="ayf_part3"
          title={`${meetingData.mwb_ayf_part3_title ?? meetingData.mwb_ayf_part3}${meetingData.mwb_ayf_part3_time ? ` (${meetingData.mwb_ayf_part3_time} min)` : ""}`}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("school_2_apply_3"))}
          participantId={assignments.get("school_2_apply_3")?.id}
          assistantOrReader={getPublisherDisplayNameOrEmpty(
            assignments.get("school_2_assistant_3"),
          )}
          assistantId={assignments.get("school_2_assistant_3")?.id}
          assistantLabel="Assistant"
          highlightPublisherId={highlightPublisherId}
        />
      )}
      {meetingData.mwb_ayf_part4 && (
        <MidweekPdfAssignmentRow
          assignmentId="ayf_part4"
          title={`${meetingData.mwb_ayf_part4_title ?? meetingData.mwb_ayf_part4}${meetingData.mwb_ayf_part4_time ? ` (${meetingData.mwb_ayf_part4_time} min)` : ""}`}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("school_2_apply_4"))}
          participantId={assignments.get("school_2_apply_4")?.id}
          assistantOrReader={getPublisherDisplayNameOrEmpty(
            assignments.get("school_2_assistant_4"),
          )}
          assistantId={assignments.get("school_2_assistant_4")?.id}
          assistantLabel="Assistant"
          highlightPublisherId={highlightPublisherId}
        />
      )}
    </View>
  );
}
