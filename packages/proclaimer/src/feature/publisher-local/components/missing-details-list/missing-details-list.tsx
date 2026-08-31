import { useState } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import {
  useMissingDetails,
  type MissingDetailFilter,
} from "./hooks/use-missing-details/use-missing-details.ts";
import { MissingDetailsSelect } from "./components/missing-details-select/missing-details-select.tsx";
import { MissingDetailsItem } from "./components/missing-details-item/missing-details-item.tsx";

export function MissingDetailsList() {
  const [filter, set_filter] = useState<MissingDetailFilter>("all");
  const { publishers } = useMissingDetails(filter);

  return (
    <>
      <MissingDetailsSelect value={filter} on_change={set_filter} />
      <IonList className="ion-margin" inset>
        {publishers.length === 0 ? (
          <IonItem>
            <IonLabel color="medium">No publishers with missing details.</IonLabel>
          </IonItem>
        ) : (
          publishers.map((entry) => <MissingDetailsItem key={entry.publisher.id} entry={entry} />)
        )}
      </IonList>
    </>
  );
}
