import { IonList } from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

export function TerritoryServantContent() {
  return (
    <IonList>
      <NavItem label="Map" to="/home/service-overseer/map" />
    </IonList>
  );
}
