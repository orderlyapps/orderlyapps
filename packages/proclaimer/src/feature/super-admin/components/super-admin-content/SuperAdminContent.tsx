import { IonList } from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

export function SuperAdminContent() {
  return (
    <IonList>
      <NavItem label="CLAM Data" to="/home/super-admin/clam-data" />
      <NavItem label="Outlines" to="/home/super-admin/outlines" />
    </IonList>
  );
}
