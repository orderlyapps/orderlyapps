import type {
  PublisherLocal,
  Version,
} from "../../../feature/publisher-local/schemas/publisher-local.js";
import { rxdb } from "../database.js";

/**
 * Fields that are always included in an export. These are required by the
 * schema (primary key, identity, version metadata) and must be present for the
 * exported data to remain valid for re-import.
 */
export const ALWAYS_EXPORTED_PUBLISHER_FIELDS = [
  "publisher_id",
  "confidential_id",
  "version",
] as const satisfies readonly (keyof PublisherLocal)[];

/**
 * Optional fields the user may opt-in to include in an export.
 */
export const OPTIONAL_PUBLISHER_EXPORT_FIELDS = [
  "phone",
  "address",
  "email",
  "emergency_contact",
  "photo",
  "birth_date",
  "baptism_date",
] as const satisfies readonly (keyof PublisherLocal)[];

export type OptionalPublisherExportField = (typeof OPTIONAL_PUBLISHER_EXPORT_FIELDS)[number];

/**
 * Build an exporter that only includes the user-selected optional fields.
 * `publisher_id`, `confidential_id` and `version` are always included.
 */
export function createPublisherLocalExporter(
  selectedOptionalFields: readonly OptionalPublisherExportField[],
): () => Promise<Blob> {
  const allowedKeys = new Set<keyof PublisherLocal>([
    ...ALWAYS_EXPORTED_PUBLISHER_FIELDS,
    ...selectedOptionalFields,
  ]);

  return async () => {
    const docs = await rxdb.publisher.find().exec();
    const data = docs.map((doc) => {
      const full = doc.toJSON() as PublisherLocal;
      const filtered: Partial<PublisherLocal> = {};
      for (const key of Object.keys(full) as (keyof PublisherLocal)[]) {
        if (allowedKeys.has(key)) {
          (filtered as Record<string, unknown>)[key] = full[key];
        }
      }
      return filtered;
    });
    const json = JSON.stringify(data, null, 2);
    return new Blob([json], { type: "application/json" });
  };
}

function emptyVersion(): Version {
  return { created_by: "", updated_by: "", created_at: 0, updated_at: 0 };
}

function updatedAt(item: { version?: Version; updated_at?: number }): number {
  return item.version?.updated_at ?? item.updated_at ?? 0;
}

/**
 * Normalizes a record from an external source (file import / WebRTC share).
 * Older exports store dates as plain strings and items may lack version
 * metadata — those get an epoch version so they only win when no versioned
 * value exists locally.
 */
function normalizePublisherLocal(doc: PublisherLocal): PublisherLocal {
  const dated = (value: unknown): PublisherLocal["birth_date"] => {
    if (typeof value === "string") {
      return value ? { value, version: emptyVersion() } : undefined;
    }
    if (value && typeof value === "object" && "value" in value) {
      const v = value as { value?: string; version?: Version };
      return v.value ? { value: v.value, version: v.version ?? emptyVersion() } : undefined;
    }
    return undefined;
  };
  const items = <T extends { id: string; version?: Version }>(list: T[] | undefined) =>
    list?.map((item) => ({ ...item, version: item.version ?? emptyVersion() }) as T);
  const photos = (list: PublisherLocal["photo"] | undefined) =>
    list?.map((item) => ({
      ...item,
      created_by: item.created_by ?? "",
      updated_by: item.updated_by ?? "",
      created_at: item.created_at ?? 0,
      updated_at: item.updated_at ?? 0,
    }));

  return {
    publisher_id: doc.publisher_id,
    confidential_id: doc.confidential_id ?? "",
    phone: items(doc.phone),
    address: items(doc.address),
    email: items(doc.email),
    emergency_contact: items(doc.emergency_contact)?.map(
      (contact) =>
        ({
          id: contact.id,
          first_name: contact.first_name,
          last_name: contact.last_name,
          relationship: contact.relationship,
          email: items(contact.email),
          phone: items(contact.phone) ?? [],
          address: items(contact.address),
          version: contact.version,
        }) as NonNullable<PublisherLocal["emergency_contact"]>[number],
    ),
    photo: photos(doc.photo),
    birth_date: dated(doc.birth_date),
    baptism_date: dated(doc.baptism_date),
    version: doc.version ?? emptyVersion(),
  };
}

/**
 * Merges array items by id — the item with the newer `updated_at` wins.
 * Items only present on one side are kept.
 */
function mergeItems<T extends { id: string; version?: Version; updated_at?: number }>(
  existing: T[] | undefined,
  incoming: T[] | undefined,
): T[] {
  if (!incoming) return existing ?? [];
  const merged = new Map((existing ?? []).map((item) => [item.id, item]));
  for (const item of incoming) {
    const current = merged.get(item.id);
    if (!current || updatedAt(item) >= updatedAt(current)) merged.set(item.id, item);
  }
  return [...merged.values()];
}

/**
 * Emergency contacts merge deeper than other arrays: when the same contact id
 * exists on both sides, scalar fields go to the newer contact while nested
 * phone/email/address lists merge per-item so additions from both sides are
 * kept.
 */
function mergeContacts(
  existing: PublisherLocal["emergency_contact"],
  incoming: PublisherLocal["emergency_contact"],
): PublisherLocal["emergency_contact"] {
  if (!incoming) return existing;
  const merged = new Map((existing ?? []).map((contact) => [contact.id, contact]));
  for (const contact of incoming) {
    const current = merged.get(contact.id);
    if (!current) {
      merged.set(contact.id, contact);
      continue;
    }
    const newer = updatedAt(contact) >= updatedAt(current) ? contact : current;
    merged.set(contact.id, {
      ...newer,
      email: mergeItems(current.email, contact.email),
      phone: mergeItems(current.phone, contact.phone),
      address: mergeItems(current.address, contact.address),
    });
  }
  return [...merged.values()];
}

function mergeDatedValue(
  existing: PublisherLocal["birth_date"],
  incoming: PublisherLocal["birth_date"],
): PublisherLocal["birth_date"] {
  if (!existing?.value) return incoming?.value ? incoming : undefined;
  if (!incoming?.value) return existing;
  return updatedAt(incoming) >= updatedAt(existing) ? incoming : existing;
}

/**
 * Document audit: `created_*` comes from whichever doc was created first,
 * `updated_*` from whichever was modified most recently.
 */
function mergeDocVersion(existing: Version, incoming: Version): Version {
  const creator = existing.created_at <= incoming.created_at ? existing : incoming;
  const updater = existing.updated_at >= incoming.updated_at ? existing : incoming;
  return {
    created_by: creator.created_by,
    created_at: creator.created_at,
    updated_by: updater.updated_by,
    updated_at: updater.updated_at,
  };
}

export function mergePublisherLocal(
  existing: PublisherLocal,
  incoming: PublisherLocal,
): PublisherLocal {
  return {
    publisher_id: existing.publisher_id,
    confidential_id: (existing.confidential_id || incoming.confidential_id) ?? "",
    phone: mergeItems(existing.phone, incoming.phone),
    address: mergeItems(existing.address, incoming.address),
    email: mergeItems(existing.email, incoming.email),
    emergency_contact: mergeContacts(existing.emergency_contact, incoming.emergency_contact),
    photo: mergeItems(existing.photo, incoming.photo),
    birth_date: mergeDatedValue(existing.birth_date, incoming.birth_date),
    baptism_date: mergeDatedValue(existing.baptism_date, incoming.baptism_date),
    version: mergeDocVersion(existing.version, incoming.version),
  };
}

/**
 * Merges records into the local collection. Incoming records are matched by
 * `publisher_id`; conflicting values resolve to the most recently updated
 * (`updated_at`) value, and locally-only records are left untouched.
 */
export async function importPublisherLocalRecords(records: PublisherLocal[]): Promise<void> {
  const existing = await rxdb.publisher.find().exec();
  const existing_map = new Map(
    existing.map((doc) => [doc.publisher_id, doc.toJSON() as PublisherLocal]),
  );

  const inserts = new Map<string, PublisherLocal>();
  for (const raw of records) {
    const incoming = normalizePublisherLocal(raw);
    const current = existing_map.get(incoming.publisher_id) ?? inserts.get(incoming.publisher_id);
    if (!current) {
      inserts.set(incoming.publisher_id, incoming);
    } else if (existing_map.has(incoming.publisher_id)) {
      const merged = mergePublisherLocal(current, incoming);
      await rxdb.publisher.upsert(merged);
      existing_map.set(incoming.publisher_id, merged);
    } else {
      inserts.set(incoming.publisher_id, mergePublisherLocal(current, incoming));
    }
  }
  if (inserts.size > 0) {
    const result = await rxdb.publisher.bulkInsert([...inserts.values()]);
    if (result.error.length > 0) {
      throw new Error(`Failed to import ${result.error.length} publisher record(s)`);
    }
  }
}

export async function importPublisherLocalData(file: File): Promise<void> {
  const text = await file.text();
  const data: PublisherLocal[] = JSON.parse(text);

  if (!Array.isArray(data)) {
    throw new Error("Invalid file format: expected an array of publishers");
  }

  await importPublisherLocalRecords(data);
}

export function generateExportFilename(): string {
  const date = new Date().toISOString().split("T")[0];
  return `publisher-local-${date}.json`;
}
