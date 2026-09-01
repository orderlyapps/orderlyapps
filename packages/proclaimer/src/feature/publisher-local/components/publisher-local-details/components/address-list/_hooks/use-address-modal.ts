import { useState } from "react";
import type { Address } from "../../../../../index.ts";
import type { AddressValue } from "../../../../../../../ui/components/inputs/address/types.ts";
import { toAddressValue } from "../_utils/address-helpers.ts";

type AddressEntry = NonNullable<Address>[number];

export function useAddressModal(
  suburbs: { id?: string; name: string; bbox?: number[] }[],
  streets: { id?: string; name: string }[],
) {
  const [editing_entry, set_editing_entry] = useState<AddressEntry | null>(null);
  const [editing_address_value, set_editing_address_value] = useState<AddressValue | undefined>(
    undefined,
  );
  const [is_modal_open, set_is_modal_open] = useState(false);

  function open_add() {
    set_editing_entry(null);
    set_editing_address_value(undefined);
    set_is_modal_open(true);
  }

  function open_edit(entry: AddressEntry) {
    set_editing_entry(entry);
    set_editing_address_value(toAddressValue(entry, suburbs, streets));
    set_is_modal_open(true);
  }

  function close_modal() {
    set_is_modal_open(false);
    set_editing_entry(null);
  }

  return { editing_entry, editing_address_value, is_modal_open, open_add, open_edit, close_modal };
}
