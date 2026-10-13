import { IonList } from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

export function MidweekMeetingParticipationContent() {
  return (
    <IonList>
      <NavItem label="Chairman" to="/home/midweek-meeting-overseer/participation/chairman" />
      <NavItem label="Prayer" to="/home/midweek-meeting-overseer/participation/prayer" />
      <NavItem label="Treasures" to="/home/midweek-meeting-overseer/participation/treasures" />
      <NavItem label="Gems" to="/home/midweek-meeting-overseer/participation/gems" />
      <NavItem
        label="Bible Reading"
        to="/home/midweek-meeting-overseer/participation/bible-reading"
      />
      <NavItem label="Apply" to="/home/midweek-meeting-overseer/participation/apply" />
      <NavItem label="Talk" to="/home/midweek-meeting-overseer/participation/talk" />
      <NavItem label="Assistant" to="/home/midweek-meeting-overseer/participation/assistant" />
      <NavItem label="Counselor" to="/home/midweek-meeting-overseer/participation/counselor" />
      <NavItem label="Living" to="/home/midweek-meeting-overseer/participation/living" />
      <NavItem
        label="CBS Conductor"
        to="/home/midweek-meeting-overseer/participation/cbs-conductor"
      />
      <NavItem label="CBS Reader" to="/home/midweek-meeting-overseer/participation/cbs-reader" />
    </IonList>
  );
}
