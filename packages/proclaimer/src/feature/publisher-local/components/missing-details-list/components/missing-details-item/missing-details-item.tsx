import { IonItem, IonLabel } from "@ionic/react";
import { useState } from "react";
import type { PublisherWithMissingDetails } from "../../hooks/use-missing-details/use-missing-details.ts";
import { MissingDetailsModal } from "./components/missing-details-modal/missing-details-modal.tsx";

interface MissingDetailsItemProps {
  entry: PublisherWithMissingDetails;
  on_open_change?: (is_open: boolean) => void;
}

function getPublisherName(entry: PublisherWithMissingDetails): string {
  const { publisher } = entry;
  const first = publisher.display_name || publisher.first_name;
  const middle = publisher.middle_name ?? "";
  return middle ? `${publisher.last_name}, ${first} ${middle}` : `${publisher.last_name}, ${first}`;
}

export function MissingDetailsItem({ entry, on_open_change }: MissingDetailsItemProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <IonItem
        lines="full"
        button
        detail
        onClick={() => {
          set_is_open(true);
          on_open_change?.(true);
        }}
      >
        <IonLabel className="ion-text-wrap">
          <h2>{getPublisherName(entry)}</h2>
        </IonLabel>
      </IonItem>

      <MissingDetailsModal
        entry={entry}
        isOpen={is_open}
        onClose={() => {
          set_is_open(false);
          on_open_change?.(false);
        }}
      />
    </>
  );
}
