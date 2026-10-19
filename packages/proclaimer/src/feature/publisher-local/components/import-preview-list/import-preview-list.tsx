import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { suburbCollection, streetCollection } from "@amodeo/proclaimer/feature/territory";
import {
  diffPublisherLocalRecords,
  type PublisherLocalUpdatedFields,
} from "@amodeo/proclaimer/database/rxdb/helper/publisherLocalExportImport";
import { LabelValueItem } from "@amodeo/proclaimer/ui/components/display/data/label-value/LabelValueItem";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { publisherLocalCollection } from "../../collections/publisher-local.ts";
import type { PublisherLocal } from "../../schemas/publisher-local.ts";
import { formatDisplayValue } from "../publisher-local-details/components/address-list/_utils/address-helpers.ts";

interface FormattedField {
  key: string;
  label: string;
  value: string;
}

interface PublisherImportPreviewItem {
  publisher_id: string;
  publisher_name: string;
  last_name: string;
  first_name: string;
  fields: FormattedField[];
}

function formatDate(date_str: string): string {
  const date = new Date(date_str);
  if (Number.isNaN(date.getTime())) return date_str;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatPublisherName(publisher: Publisher | undefined, fallback_id: string): string {
  if (!publisher) return fallback_id;
  const first = publisher.display_name || publisher.first_name;
  const middle = publisher.middle_name ?? "";
  return middle ? `${publisher.last_name}, ${first} ${middle}` : `${publisher.last_name}, ${first}`;
}

function formatUpdatedFields(
  diff: PublisherLocalUpdatedFields,
  suburbs: { id?: string; name: string }[],
  streets: { id?: string; name: string }[],
): FormattedField[] {
  const fields: FormattedField[] = [];

  if (diff.birth_date) {
    fields.push({
      key: "birth_date",
      label: "Date of Birth",
      value: formatDate(diff.birth_date),
    });
  }

  if (diff.baptism_date) {
    fields.push({
      key: "baptism_date",
      label: "Baptism Date",
      value: formatDate(diff.baptism_date),
    });
  }

  for (const addr of diff.address) {
    const formatted = formatDisplayValue(addr, suburbs, streets);
    const coords_text =
      formatted === "-" && addr.coordinates
        ? `${addr.coordinates[1]}, ${addr.coordinates[0]}`
        : formatted;
    fields.push({
      key: `address-${addr.id}`,
      label: addr.label ? `${addr.label} Address` : "Address",
      value: coords_text,
    });
  }

  for (const p of diff.phone) {
    fields.push({
      key: `phone-${p.id}`,
      label: p.label ? `${p.label} Phone` : "Phone",
      value: p.number,
    });
  }

  for (const e of diff.email) {
    fields.push({
      key: `email-${e.id}`,
      label: e.label ? `${e.label} Email` : "Email",
      value: e.address,
    });
  }

  for (const contact of diff.emergency_contact) {
    const phones = (contact.phone ?? []).map((p) => p.number);
    const emails = (contact.email ?? []).map((e) => e.address);
    const addresses = (contact.address ?? [])
      .map((a) => formatDisplayValue(a, suburbs, streets))
      .filter((v) => v !== "-");
    const details = [...phones, ...emails, ...addresses].join(" • ");
    fields.push({
      key: `emergency-${contact.id}`,
      label: `Emergency Contact (${contact.first_name} ${contact.last_name} - ${contact.relationship})`,
      value: details || `${contact.first_name} ${contact.last_name}`,
    });
  }

  for (const photo of diff.photo) {
    fields.push({
      key: `photo-${photo.id}`,
      label: "Photo",
      value: photo.label || "Updated photo",
    });
  }

  return fields;
}

export function usePublisherLocalImportPreview(records: PublisherLocal[] | null) {
  const { data: local_data } = useLiveQuery((q) => q.from({ pl: publisherLocalCollection }), []);
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }), []);
  const { data: suburbs_data } = useLiveQuery((q) => q.from({ s: suburbCollection }), []);
  const { data: streets_data } = useLiveQuery((q) => q.from({ st: streetCollection }), []);

  if (!records) {
    return { items: [] as PublisherImportPreviewItem[] };
  }

  const existing = (local_data ?? []) as PublisherLocal[];
  const publishers = (publishers_data ?? []) as Publisher[];
  const suburbs = (suburbs_data ?? []) as { id?: string; name: string }[];
  const streets = (streets_data ?? []) as { id?: string; name: string }[];

  const publisher_map = new Map<string, Publisher>();
  for (const p of publishers) {
    if (p.id) publisher_map.set(p.id, p);
  }

  const diffs = diffPublisherLocalRecords(existing, records);
  const items: PublisherImportPreviewItem[] = diffs
    .map((diff) => {
      const pub = publisher_map.get(diff.publisher_id);
      return {
        publisher_id: diff.publisher_id,
        publisher_name: formatPublisherName(pub, diff.publisher_id),
        last_name: pub?.last_name ?? diff.publisher_id,
        first_name: pub?.first_name ?? "",
        fields: formatUpdatedFields(diff, suburbs, streets),
      };
    })
    .sort(
      (a, b) => a.last_name.localeCompare(b.last_name) || a.first_name.localeCompare(b.first_name),
    );

  return { items };
}

interface ImportPreviewListProps {
  records: PublisherLocal[];
}

export function ImportPreviewList({ records }: ImportPreviewListProps) {
  const { items } = usePublisherLocalImportPreview(records);

  if (items.length === 0) {
    return (
      <IonNote color="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
        No new or updated publisher data found in this import.
      </IonNote>
    );
  }

  return (
    <div>
      <IonNote style={{ display: "block", marginBottom: "0.5rem" }}>
        {items.length} publisher{items.length !== 1 ? "s" : ""} will be updated:
      </IonNote>
      <IonList>
        {items.map((item) => (
          <div key={item.publisher_id}>
            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                <Heading size="sm">{item.publisher_name}</Heading>
              </IonLabel>
            </IonItem>
            {item.fields.map((field) => (
              <LabelValueItem key={field.key} label={field.label} value={field.value} />
            ))}
          </div>
        ))}
      </IonList>
    </div>
  );
}
