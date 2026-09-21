import { IonList } from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

export function ElderContent() {
  return (
    <IonList>
      <NavItem label="Reports" to="/home/elder/reports" />
      <NavItem label="PDFs" to="/home/elder/pdfs" />
      <NavItem label="Regular Pioneers" to="/home/secretary/pioneers" />
    </IonList>
  );
}
