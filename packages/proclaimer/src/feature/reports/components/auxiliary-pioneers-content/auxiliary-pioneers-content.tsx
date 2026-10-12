import { useState } from "react";
import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { useAuxiliaryPioneers } from "./hooks/use-auxiliary-pioneers/use-auxiliary-pioneers.ts";
import { MonthNavigation } from "../../../../ui/components/navigation/month-navigation/MonthNavigation.tsx";
import { Spinner } from "../../../../ui/components/display/spinner/Spinner.tsx";
import { Body } from "../../../../ui/components/display/text/body/Body.tsx";

function currentMonthStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function AuxiliaryPioneersContent() {
  const [month, set_month] = useState(currentMonthStr());
  const { entries, isLoading } = useAuxiliaryPioneers(month);

  return (
    <>
      <MonthNavigation month={month} on_change={set_month} max_months_ahead={1} />
      {isLoading ? (
        <Spinner />
      ) : entries.length === 0 ? (
        <IonList>
          <IonItem lines="none">
            <IonLabel color="medium">No auxiliary pioneers for this month.</IonLabel>
          </IonItem>
        </IonList>
      ) : (
        <IonList>
          {entries.map((entry, i) => (
            <IonItem key={entry.publisher_id} lines={i === entries.length - 1 ? "none" : "full"}>
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
        </IonList>
      )}
    </>
  );
}
