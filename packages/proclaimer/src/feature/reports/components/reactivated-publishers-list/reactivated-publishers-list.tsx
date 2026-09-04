import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useReactivatedPublishers } from "./hooks/use-reactivated-publishers/use-reactivated-publishers.ts";
import { ReactivatedPublishersItem } from "./components/reactivated-publishers-item/reactivated-publishers-item.tsx";
import { Spinner } from "../../../../ui/components/display/spinner/Spinner.tsx";
import { Body } from "../../../../ui/components/display/text/body/Body.tsx";

export function ReactivatedPublishersList() {
  const { entries, isLoading } = useReactivatedPublishers();

  if (isLoading) {
    return <Spinner />;
  }

  if (entries.length === 0) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel color="medium">No reactivated publishers.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList>
      {entries.map((entry, i) => (
        <ReactivatedPublishersItem
          key={entry.publisher_id}
          entry={entry}
          lines={i === entries.length - 1 ? "none" : "full"}
        />
      ))}
      <IonItem lines="none">
        <IonLabel color="medium">
          <Body size="sm">
            {entries.length} reactivated publisher{entries.length > 1 ? "s" : ""}
          </Body>
        </IonLabel>
      </IonItem>
    </IonList>
  );
}
