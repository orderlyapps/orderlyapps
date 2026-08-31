import { IonList } from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";
import { ImportPublisherDataButton } from "./components/import-publisher-data-button/ImportPublisherDataButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

export function SecretaryContent() {
  return (
    <>
      <IonList>
        <NavItem label="Publishers" to="/home/secretary/publishers" />
        <NavItem label="Publisher Records" to="/home/secretary/publisher-records" />
        <NavItem label="Groups" to="/home/secretary/groups" />
        <NavItem label="Tools" to="/home/secretary/tools" />
        <NavItem label="Branch Report" to="/home/secretary/branch-report" />
        <NavItem label="CO Visit Info" to="/home/secretary/co-visit-info" />
        <NavItem label="Missing Details" to="/home/secretary/missing-details" />
      </IonList>
      <Space />
      <ImportPublisherDataButton />
    </>
  );
}
