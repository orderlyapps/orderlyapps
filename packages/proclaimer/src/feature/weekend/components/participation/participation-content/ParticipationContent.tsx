import { IonList } from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";
import {
  weekendParticipationTypeLabels,
  weekendParticipationTypes,
} from "../../../utils/weekend-participation-type-labels.ts";

export function ParticipationContent() {
  return (
    <IonList>
      {weekendParticipationTypes.map((type) => (
        <NavItem
          key={type}
          label={weekendParticipationTypeLabels[type]}
          to={`/home/weekend/participation/${type}`}
        />
      ))}
    </IonList>
  );
}
