import { PhoneInput } from "../../../../../../../../ui/components/inputs/phone/PhoneInput.tsx";
import type { Phone } from "../../../../../../index.ts";

type PhoneEntry = NonNullable<Phone>[number];

interface Props {
  phones: PhoneEntry[];
  on_change: (phones: PhoneEntry[]) => void;
}

export function EmergencyPhoneList({ phones, on_change }: Props) {
  return phones.map((p, i) => (
    <PhoneInput
      key={p.id}
      label={`Phone${phones.length > 1 ? ` ${i + 1}` : ""}`}
      value={p.number}
      on_change={(value) =>
        on_change(phones.map((ph) => (ph.id === p.id ? { ...ph, number: value } : ph)))
      }
    />
  ));
}
