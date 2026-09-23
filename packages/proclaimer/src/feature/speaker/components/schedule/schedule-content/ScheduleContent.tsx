import { WeekNavigation } from "@amodeo/proclaimer/ui/components/navigation/week-navigation/WeekNavigation";
import { SpeakerWeekInfo } from "./components/speaker-week-info/SpeakerWeekInfo.tsx";
import { OutgoingSpeakersList } from "./components/outgoing-speakers-list/OutgoingSpeakersList.tsx";

type ScheduleContentProps = {
  week_id: string;
};

export function ScheduleContent({ week_id }: ScheduleContentProps) {
  return (
    <>
      <WeekNavigation week_id={week_id} />
      <SpeakerWeekInfo week_id={week_id} />
      <OutgoingSpeakersList week_id={week_id} />
    </>
  );
}
