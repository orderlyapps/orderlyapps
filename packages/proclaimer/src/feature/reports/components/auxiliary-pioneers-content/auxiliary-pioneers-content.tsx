import { useState } from "react";
import { IonIcon, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { useAuxiliaryPioneers } from "./hooks/use-auxiliary-pioneers/use-auxiliary-pioneers.ts";
import { AuxiliaryPioneerModal } from "./components/auxiliary-pioneer-modal/auxiliary-pioneer-modal.tsx";
import { MonthNavigation } from "../../../../ui/components/navigation/month-navigation/MonthNavigation.tsx";
import { Spinner } from "../../../../ui/components/display/spinner/Spinner.tsx";
import { Body } from "../../../../ui/components/display/text/body/Body.tsx";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";

function currentMonthStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function AuxiliaryPioneersContent() {
  const [month, set_month] = useState(currentMonthStr());
  const [modal_open, set_modal_open] = useState(false);
  const { entries, isLoading, show_continuous } = useAuxiliaryPioneers(month);
  const { has_secretary, has_congregation_admin, is_super_admin } = usePermissions();
  const can_add = show_continuous && (has_secretary || has_congregation_admin || is_super_admin);

  return (
    <>
      <MonthNavigation month={month} on_change={set_month} max_months_ahead={1} />
      {isLoading ? (
        <Spinner />
      ) : (
        <IonList>
          {can_add && (
            <IonItem button detail={false} onClick={() => set_modal_open(true)}>
              <IonIcon icon={addCircleOutline} slot="start" color="primary" />
              <IonLabel>Add Auxiliary Pioneer</IonLabel>
            </IonItem>
          )}
          {entries.length === 0 ? (
            <IonItem lines="none">
              <IonLabel color="medium">No auxiliary pioneers for this month.</IonLabel>
            </IonItem>
          ) : (
            <>
              {entries.map((entry, i) => (
                <IonItem
                  key={entry.publisher_id}
                  lines={i === entries.length - 1 ? "none" : "full"}
                  button
                  detail
                  routerLink={`/home/secretary/auxiliary-pioneers/${entry.publisher_id}`}
                >
                  <IonLabel className="ion-text-wrap">
                    <Body>{entry.full_name}</Body>
                  </IonLabel>
                  <IonNote slot="end">
                    {[
                      entry.continuous ? "Continuous" : null,
                      entry.hours !== null ? `${entry.hours} hrs` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </IonNote>
                </IonItem>
              ))}
              <IonItem lines="none">
                <IonLabel color="medium">
                  <Body size="sm">
                    {entries.length} auxiliary pioneer{entries.length > 1 ? "s" : ""}
                  </Body>
                </IonLabel>
              </IonItem>
            </>
          )}
        </IonList>
      )}
      <AuxiliaryPioneerModal
        is_open={modal_open}
        on_dismiss={() => set_modal_open(false)}
        month={month}
        exclude_ids={entries.map((e) => e.publisher_id)}
      />
    </>
  );
}
