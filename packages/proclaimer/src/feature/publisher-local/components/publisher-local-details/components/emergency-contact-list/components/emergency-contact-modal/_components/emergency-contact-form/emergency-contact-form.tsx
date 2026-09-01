import { IonList } from "@ionic/react";
import { TextInput } from "../../../../../../../../../../ui/components/inputs/text/TextInput.tsx";
import { Select } from "../../../../../../../../../../ui/components/inputs/select/Select.tsx";
import { RELATIONSHIP_OPTIONS } from "../../../../_constants/relationship-options.ts";
import { EmergencyPhoneList } from "../../../../_components/emergency-phone-list/emergency-phone-list.tsx";
import type { Phone } from "../../../../../../../../index.ts";

type PhoneEntry = NonNullable<Phone>[number];

interface Props {
  first_name: string;
  last_name: string;
  relationship: string;
  phones: PhoneEntry[];
  on_first_name: (v: string) => void;
  on_last_name: (v: string) => void;
  on_relationship: (v: string) => void;
  on_phones: (v: PhoneEntry[]) => void;
}

export function EmergencyContactForm({
  first_name,
  last_name,
  relationship,
  phones,
  on_first_name,
  on_last_name,
  on_relationship,
  on_phones,
}: Props) {
  return (
    <IonList>
      <TextInput label="First Name" value={first_name} on_change={on_first_name} />
      <TextInput label="Last Name" value={last_name} on_change={on_last_name} />
      <Select
        label="Relationship"
        value={relationship}
        placeholder="Select relationship"
        options={RELATIONSHIP_OPTIONS.map((r) => ({ label: r, value: r }))}
        on_change={(value) => on_relationship(value as string)}
      />
      <EmergencyPhoneList phones={phones} on_change={on_phones} />
    </IonList>
  );
}
