import { IonButton, IonIcon } from "@ionic/react";
import { mapOutline } from "ionicons/icons";
import type { Address } from "../../../../../../index.ts";
import { LabelValueItem } from "../../../../../../../../ui/components/display/data/label-value/LabelValueItem.tsx";
import { formatDisplayValue } from "../../_utils/address-helpers.ts";

type AddressEntry = NonNullable<Address>[number];

interface Props {
  address: NonNullable<Address>;
  read_only: boolean;
  suburbs: { id?: string; name: string }[];
  streets: { id?: string; name: string }[];
  on_share_coordinates?: (coords: { lat: number; lng: number }) => void;
  on_edit: (entry: AddressEntry) => void;
}

export function AddressItems({
  address,
  read_only,
  suburbs,
  streets,
  on_share_coordinates,
  on_edit,
}: Props) {
  return address.map((entry) =>
    read_only ? (
      <LabelValueItem
        key={entry.id}
        label={entry.label + " Address"}
        value={formatDisplayValue(entry, suburbs, streets)}
        end_detail={
          entry.coordinates && entry.coordinates.length >= 2 && on_share_coordinates ? (
            <IonButton
              fill="clear"
              size="small"
              aria-label={`Share ${entry.label}`}
              onClick={() =>
                on_share_coordinates({
                  lat: entry.coordinates![1],
                  lng: entry.coordinates![0],
                })
              }
            >
              <IonIcon slot="icon-only" icon={mapOutline} />
            </IonButton>
          ) : undefined
        }
      />
    ) : (
      <LabelValueItem
        key={entry.id}
        label={entry.label}
        value={formatDisplayValue(entry, suburbs, streets)}
        on_click={() => on_edit(entry)}
      />
    ),
  );
}
