import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import type { Address } from "../../../../index.ts";
import { suburbCollection, streetCollection } from "@amodeo/proclaimer/feature/territory";
import { Heading } from "../../../../../../ui/components/display/text/heading/Heading.tsx";
import { Space } from "../../../../../../ui/components/layout/space/Space.tsx";
import { AddressAddModal } from "./components/address-add-modal/address-add-modal.tsx";
import { AddressItems } from "./_components/address-items/address-items.tsx";
import { useAddressModal } from "./_hooks/use-address-modal.ts";

interface Props {
  publisher_id: string;
  address: NonNullable<Address>;
  read_only?: boolean;
  on_share_coordinates?: (coords: { lat: number; lng: number }) => void;
}

export function AddressList({
  publisher_id,
  address,
  read_only = false,
  on_share_coordinates,
}: Props) {
  const { data: suburbs } = useLiveQuery((q) => q.from({ s: suburbCollection }));
  const { data: streets } = useLiveQuery((q) => q.from({ st: streetCollection }));
  const modal = useAddressModal(suburbs ?? [], streets ?? []);

  return (
    <>
      {!read_only && (
        <>
          <Space />
          <IonItem>
            <IonLabel>
              <Heading size="sm">Addresses</Heading>
            </IonLabel>
            <IonButton
              fill="clear"
              size="small"
              slot="end"
              onClick={modal.open_add}
              aria-label="Add address"
            >
              <IonIcon icon={addOutline} color="primary" />
            </IonButton>
          </IonItem>
        </>
      )}
      <AddressItems
        address={address}
        read_only={read_only}
        suburbs={suburbs ?? []}
        streets={streets ?? []}
        on_share_coordinates={on_share_coordinates}
        on_edit={modal.open_edit}
      />
      {address.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No addresses</IonLabel>
        </IonItem>
      )}
      {!read_only && (
        <AddressAddModal
          is_open={modal.is_modal_open}
          on_dismiss={modal.close_modal}
          publisher_id={publisher_id}
          entry={modal.editing_entry}
          address_value={modal.editing_address_value}
        />
      )}
    </>
  );
}
