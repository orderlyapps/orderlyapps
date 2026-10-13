import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { MidweekPdfAssignmentRow } from "../midweek-pdf-assignment-row/MidweekPdfAssignmentRow.tsx";
import { SecondSchoolSection } from "../second-school-section/SecondSchoolSection.tsx";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { getPublisherDisplayNameOrEmpty } from "../../../../../utils/get-publisher-display-name-or-empty.ts";
import type { WeekScheduleData } from "../../../../../hooks/use-midweek-meeting-schedule-data.ts";

const styles = StyleSheet.create({
  weekSection: {
    marginBottom: 2,
    borderBottom: "1pt solid #ddd",
    paddingBottom: 2,
    fontSize: 10,
  },
  weekDate: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#333",
  },
  section: {
    marginBottom: 0,
    fontSize: 10,
  },
});

export function WeekSection({
  week,
  highlightPublisherId,
}: {
  week: WeekScheduleData;
  highlightPublisherId?: string;
}) {
  const { meetingData, assignments } = week;
  const hasSecondSchool = assignments.has("chairman_2");
  const dateLabel = getTheocraticWeekLabel(week.weekId);

  return (
    <View style={styles.weekSection}>
      <Text style={styles.weekDate}>{dateLabel}</Text>

      <View style={styles.section}>
        <MidweekPdfAssignmentRow
          assignmentId="chairman_1"
          title="Chairman"
          participant={getPublisherDisplayNameOrEmpty(assignments.get("chairman_1"))}
          participantId={assignments.get("chairman_1")?.id}
          highlightPublisherId={highlightPublisherId}
        />
        <MidweekPdfAssignmentRow
          assignmentId="prayer_1"
          title="Opening Prayer"
          participant={getPublisherDisplayNameOrEmpty(assignments.get("prayer_1"))}
          participantId={assignments.get("prayer_1")?.id}
          highlightPublisherId={highlightPublisherId}
        />
        <MidweekPdfAssignmentRow
          assignmentId="tgw_talk"
          title={meetingData.mwb_tgw_talk_title ?? "Talk"}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("treasures"))}
          participantId={assignments.get("treasures")?.id}
          highlightPublisherId={highlightPublisherId}
        />
        <MidweekPdfAssignmentRow
          assignmentId="tgw_gems"
          title={meetingData.mwb_tgw_gems_title ?? "Spiritual Gems"}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("gems"))}
          participantId={assignments.get("gems")?.id}
          highlightPublisherId={highlightPublisherId}
        />
        <MidweekPdfAssignmentRow
          assignmentId="tgw_bread"
          title={meetingData.mwb_tgw_bread_title ?? "Bible Reading"}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("school_1_bible_reading"))}
          participantId={assignments.get("school_1_bible_reading")?.id}
          highlightPublisherId={highlightPublisherId}
        />
      </View>

      <View style={styles.section}>
        {meetingData.mwb_ayf_part1 && (
          <MidweekPdfAssignmentRow
            assignmentId="ayf_part1"
            title={`${meetingData.mwb_ayf_part1_title ?? meetingData.mwb_ayf_part1}${meetingData.mwb_ayf_part1_time ? ` (${meetingData.mwb_ayf_part1_time} min)` : ""}`}
            participant={getPublisherDisplayNameOrEmpty(assignments.get("school_1_apply_1"))}
            participantId={assignments.get("school_1_apply_1")?.id}
            assistantOrReader={getPublisherDisplayNameOrEmpty(
              assignments.get("school_1_assistant_1"),
            )}
            assistantId={assignments.get("school_1_assistant_1")?.id}
            assistantLabel="Assistants"
            highlightPublisherId={highlightPublisherId}
          />
        )}
        {meetingData.mwb_ayf_part2 && (
          <MidweekPdfAssignmentRow
            assignmentId="ayf_part2"
            title={`${meetingData.mwb_ayf_part2_title ?? meetingData.mwb_ayf_part2}${meetingData.mwb_ayf_part2_time ? ` (${meetingData.mwb_ayf_part2_time} min)` : ""}`}
            participant={getPublisherDisplayNameOrEmpty(assignments.get("school_1_apply_2"))}
            participantId={assignments.get("school_1_apply_2")?.id}
            assistantOrReader={getPublisherDisplayNameOrEmpty(
              assignments.get("school_1_assistant_2"),
            )}
            assistantId={assignments.get("school_1_assistant_2")?.id}
            assistantLabel="Assistant"
            highlightPublisherId={highlightPublisherId}
          />
        )}
        {meetingData.mwb_ayf_part3 && (
          <MidweekPdfAssignmentRow
            assignmentId="ayf_part3"
            title={`${meetingData.mwb_ayf_part3_title ?? meetingData.mwb_ayf_part3}${meetingData.mwb_ayf_part3_time ? ` (${meetingData.mwb_ayf_part3_time} min)` : ""}`}
            participant={getPublisherDisplayNameOrEmpty(assignments.get("school_1_apply_3"))}
            participantId={assignments.get("school_1_apply_3")?.id}
            assistantOrReader={getPublisherDisplayNameOrEmpty(
              assignments.get("school_1_assistant_3"),
            )}
            assistantId={assignments.get("school_1_assistant_3")?.id}
            assistantLabel="Assistant"
            highlightPublisherId={highlightPublisherId}
          />
        )}
        {meetingData.mwb_ayf_part4 && (
          <MidweekPdfAssignmentRow
            assignmentId="ayf_part4"
            title={`${meetingData.mwb_ayf_part4_title ?? meetingData.mwb_ayf_part4}${meetingData.mwb_ayf_part4_time ? ` (${meetingData.mwb_ayf_part4_time} min)` : ""}`}
            participant={getPublisherDisplayNameOrEmpty(assignments.get("school_1_apply_4"))}
            participantId={assignments.get("school_1_apply_4")?.id}
            assistantOrReader={getPublisherDisplayNameOrEmpty(
              assignments.get("school_1_assistant_4"),
            )}
            assistantId={assignments.get("school_1_assistant_4")?.id}
            assistantLabel="Assistant"
            highlightPublisherId={highlightPublisherId}
          />
        )}
      </View>

      {hasSecondSchool && (
        <SecondSchoolSection week={week} highlightPublisherId={highlightPublisherId} />
      )}

      <View style={styles.section}>
        <MidweekPdfAssignmentRow
          assignmentId="lc_part1"
          title={meetingData.mwb_lc_part1_title ?? meetingData.mwb_lc_part1}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("living_1"))}
          participantId={assignments.get("living_1")?.id}
          highlightPublisherId={highlightPublisherId}
        />
        {meetingData.mwb_lc_part2 && (
          <MidweekPdfAssignmentRow
            assignmentId="lc_part2"
            title={meetingData.mwb_lc_part2_title ?? meetingData.mwb_lc_part2}
            participant={getPublisherDisplayNameOrEmpty(assignments.get("living_2"))}
            participantId={assignments.get("living_2")?.id}
            highlightPublisherId={highlightPublisherId}
          />
        )}
        <MidweekPdfAssignmentRow
          assignmentId="lc_cbs"
          title={meetingData.mwb_lc_cbs_title ?? "Congregation Bible Study"}
          participant={getPublisherDisplayNameOrEmpty(assignments.get("cbs_conductor"))}
          participantId={assignments.get("cbs_conductor")?.id}
          assistantOrReader={getPublisherDisplayNameOrEmpty(assignments.get("cbs_reader"))}
          assistantId={assignments.get("cbs_reader")?.id}
          assistantLabel="Reader"
          highlightPublisherId={highlightPublisherId}
        />
      </View>

      <MidweekPdfAssignmentRow
        assignmentId="prayer_2"
        title="Closing Prayer"
        participant={getPublisherDisplayNameOrEmpty(assignments.get("prayer_2"))}
        participantId={assignments.get("prayer_2")?.id}
        highlightPublisherId={highlightPublisherId}
      />
    </View>
  );
}
