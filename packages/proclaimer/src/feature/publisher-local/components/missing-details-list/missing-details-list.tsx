import { useState } from "react";
import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
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
      <IonGrid>
        {publishers.length === 0 ? (
          <IonRow>
            <IonCol>
              <IonLabel color="medium">No publishers with missing details.</IonLabel>
            </IonCol>
          </IonRow>
        ) : (
          <IonRow>
            {publishers.map((entry) => (
              <IonCol
                key={entry.publisher.id}
                sizeXs="12"
                sizeSm="6"
                sizeMd="6"
                sizeLg="4"
                sizeXl="3"
              >
                <MissingDetailsItem entry={entry} />
              </IonCol>
            ))}
          </IonRow>
        )}
      </IonGrid>
    </>
  );
}
