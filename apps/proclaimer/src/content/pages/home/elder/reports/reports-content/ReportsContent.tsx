import { IonList } from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

export function ReportsContent() {
  return (
    <IonList>
      <NavItem label="Publishers" to="/home/elder/reports/publishers" />
    </IonList>
  );
}
