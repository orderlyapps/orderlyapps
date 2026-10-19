import { useEffect, useState } from "react";
import {
  publisherLocalCollection,
  upsertPublisherLocal,
  createVersion,
  touchVersion,
  type EmergencyContact,
  type Phone,
} from "../../../../../index.ts";

type Contact = NonNullable<EmergencyContact>[number];
type PhoneEntry = NonNullable<Phone>[number];

function createEmptyPhone(): PhoneEntry {
  return {
    id: crypto.randomUUID(),
    number: "",
    label: "Phone",
    version: createVersion(),
  };
}

export function useEmergencyContactForm(
  is_open: boolean,
  contact: Contact | null | undefined,
  publisher_id: string,
  on_dismiss: () => void,
) {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [relationship, set_relationship] = useState("");
  const [phones, set_phones] = useState<PhoneEntry[]>([]);

  useEffect(() => {
    if (is_open) {
      set_first_name(contact?.first_name ?? "");
      set_last_name(contact?.last_name ?? "");
      set_relationship(contact?.relationship ?? "");
      set_phones(contact?.phone?.length ? contact.phone : [createEmptyPhone()]);
    }
  }, [is_open, contact]);

  const is_valid =
    first_name.trim() &&
    last_name.trim() &&
    relationship.trim() &&
    phones.some((p) => p.number.trim());

  function submit() {
    const id = contact?.id ?? crypto.randomUUID();
    const version = contact?.version ?? createVersion();
    upsertPublisherLocal(publisher_id, (draft) => {
      const current_contacts = draft.emergency_contact ?? [];
      const updated = current_contacts.map((c) => {
        if (c.id !== id) return c;
        const prev_phones = new Map((c.phone ?? []).map((p) => [p.id, p]));
        const next_phones = phones.map((p) => {
          const prev = prev_phones.get(p.id);
          if (!prev) return p;
          return prev.number !== p.number || prev.label !== p.label
            ? { ...p, version: touchVersion(p.version) }
            : p;
        });
        return {
          ...c,
          first_name,
          last_name,
          relationship,
          phone: next_phones,
          version: touchVersion(c.version),
        };
      });
      if (!current_contacts.some((c) => c.id === id)) {
        updated.push({ id, first_name, last_name, relationship, phone: phones, version });
      }
      draft.emergency_contact = updated;
      draft.version = touchVersion(draft.version);
    });
    on_dismiss();
  }

  function remove() {
    if (!contact) return;
    publisherLocalCollection.update(publisher_id, (draft) => {
      draft.emergency_contact = (draft.emergency_contact ?? []).filter((c) => c.id !== contact.id);
      draft.version = touchVersion(draft.version);
    });
    on_dismiss();
  }

  return {
    first_name,
    set_first_name,
    last_name,
    set_last_name,
    relationship,
    set_relationship,
    phones,
    set_phones,
    is_valid,
    submit,
    remove,
  };
}
