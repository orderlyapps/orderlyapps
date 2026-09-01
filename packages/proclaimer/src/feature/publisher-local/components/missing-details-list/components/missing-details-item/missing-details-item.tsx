import { IonItem, IonLabel } from "@ionic/react";
import { useState } from "react";
import type { PublisherWithMissingDetails } from "../../hooks/use-missing-details/use-missing-details.ts";
import { MissingDetailsModal } from "./components/missing-details-modal/missing-details-modal.tsx";

interface MissingDetailsItemProps {
  entry: PublisherWithMissingDetails;
}

function getPublisherName(entry: PublisherWithMissingDetails): string {
  const { publisher } = entry;
  const first = publisher.display_name || publisher.first_name;
  const middle = publisher.middle_name ?? "";
  return middle ? `${publisher.last_name}, ${first} ${middle}` : `${publisher.last_name}, ${first}`;
}

export function MissingDetailsItem({ entry }: MissingDetailsItemProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <IonItem lines="full" button detail onClick={() => set_is_open(true)}>
        <IonLabel className="ion-text-wrap">
          <h2>{getPublisherName(entry)}</h2>
        </IonLabel>
      </IonItem>

      <MissingDetailsModal entry={entry} isOpen={is_open} onClose={() => set_is_open(false)} />
    </>
  );
}
