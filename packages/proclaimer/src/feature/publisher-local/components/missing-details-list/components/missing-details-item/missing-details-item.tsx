import { IonChip, IonItem, IonLabel, IonText } from "@ionic/react";
import type { PublisherWithMissingDetails } from "../../../../hooks/use-missing-details/use-missing-details.ts";
import { MISSING_DETAIL_LABELS } from "../../../../hooks/use-missing-details/use-missing-details.ts";

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
  return (
    <IonItem lines="full">
      <IonLabel className="ion-text-wrap">
        <h2>{getPublisherName(entry)}</h2>
        <IonText>
          <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
            {entry.missing_details.map((detail) => (
              <IonChip key={detail} color="warning">
                {MISSING_DETAIL_LABELS[detail]}
              </IonChip>
            ))}
          </div>
        </IonText>
      </IonLabel>
    </IonItem>
  );
}
