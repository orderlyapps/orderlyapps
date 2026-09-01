import { useState } from "react";
import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import {
  useMissingDetails,
  type MissingDetailFilter,
} from "./hooks/use-missing-details/use-missing-details.ts";
import { MissingDetailsSelect } from "./components/missing-details-select/missing-details-select.tsx";
import { MissingDetailsItem } from "./components/missing-details-item/missing-details-item.tsx";
import { MissingDetailsToggles } from "./components/missing-details-toggles/missing-details-toggles.tsx";
import { RESPONSIVE_COL_SIZES } from "../../../../ui/types/responsive-col-sizes.ts";

export function MissingDetailsList() {
  const [filter, set_filter] = useState<MissingDetailFilter>("all");
  const [show_associate, set_show_associate] = useState(false);
  const [show_archived, set_show_archived] = useState(false);
  const { publishers } = useMissingDetails(filter, { show_associate, show_archived });

  return (
    <>
      <IonGrid>
        <IonRow className="ion-justify-content-around">
          <IonCol {...RESPONSIVE_COL_SIZES} sizeSm="12" sizeMd="12" sizeLg="12">
            <MissingDetailsSelect value={filter} on_change={set_filter} />
          </IonCol>
          <MissingDetailsToggles
            show_associate={show_associate}
            show_archived={show_archived}
            on_show_associate_change={set_show_associate}
            on_show_archived_change={set_show_archived}
          />
        </IonRow>
        {publishers.length === 0 ? (
          <IonRow>
            <IonCol>
              <IonLabel color="medium">No publishers with missing details.</IonLabel>
            </IonCol>
          </IonRow>
        ) : (
          <IonRow>
            {publishers.map((entry) => (
              <IonCol key={entry.publisher.id} {...RESPONSIVE_COL_SIZES}>
                <MissingDetailsItem entry={entry} />
              </IonCol>
            ))}
          </IonRow>
        )}
      </IonGrid>
    </>
  );
}
