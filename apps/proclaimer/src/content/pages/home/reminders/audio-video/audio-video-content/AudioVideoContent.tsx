import { IonList } from "@ionic/react";
import { WeekNavigation } from "@amodeo/proclaimer/ui/components/navigation/week-navigation/WeekNavigation";
import { AvAssignmentList } from "./components/av-assignment-list/AvAssignmentList";

type AudioVideoContentProps = {
  week_id: string;
};

export function AudioVideoContent({ week_id }: AudioVideoContentProps) {
  return (
    <IonList>
      <WeekNavigation week_id={week_id} />
      <AvAssignmentList week_id={week_id} />
    </IonList>
  );
}
