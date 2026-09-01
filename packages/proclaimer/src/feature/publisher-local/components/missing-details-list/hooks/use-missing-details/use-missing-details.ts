import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "../../../../../publisher/collections/publisher.ts";
import { publisherLocalCollection } from "../../../../collections/publisher-local.ts";
import type { PublisherLocal } from "../../../../schemas/publisher-local.ts";
import type { Publisher } from "../../../../../publisher/schemas/publisher.ts";

export type MissingDetailType =
  | "phone"
  | "address"
  | "email"
  | "emergency_contact"
  | "birth_date"
  | "baptism_date";

export type MissingDetailFilter = MissingDetailType | "all";

export type PublisherWithMissingDetails = {
  publisher: Publisher;
  local: PublisherLocal | null;
  missing_details: MissingDetailType[];
};

export const MISSING_DETAIL_LABELS: Record<MissingDetailType, string> = {
  phone: "Phone",
  address: "Address",
  email: "Email",
  emergency_contact: "Emergency Contact",
  birth_date: "Birth Date",
  baptism_date: "Baptism Date",
};

function getMissingDetails(
  publisher: Publisher,
  local: PublisherLocal | null,
): MissingDetailType[] {
  if (!local) {
    const all: MissingDetailType[] = [
      "phone",
      "address",
      "email",
      "emergency_contact",
      "birth_date",
    ];
    if (publisher.standing !== "unbaptised_publisher" && publisher.standing !== "associate")
      all.push("baptism_date");
    return all;
  }

  const missing: MissingDetailType[] = [];
  if (!local.phone || local.phone.length === 0) missing.push("phone");
  if (!local.address || local.address.length === 0) missing.push("address");
  if (!local.email || local.email.length === 0) missing.push("email");
  if (!local.emergency_contact || local.emergency_contact.length === 0)
    missing.push("emergency_contact");
  if (!local.birth_date) missing.push("birth_date");
  if (
    !local.baptism_date &&
    publisher.standing !== "unbaptised_publisher" &&
    publisher.standing !== "associate"
  )
    missing.push("baptism_date");
  return missing;
}

function sortByLastName(a: PublisherWithMissingDetails, b: PublisherWithMissingDetails): number {
  return (
    a.publisher.last_name.localeCompare(b.publisher.last_name) ||
    a.publisher.first_name.localeCompare(b.publisher.first_name)
  );
}

export function useMissingDetails(filter: MissingDetailFilter = "all") {
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }), []);
  const { data: local_data } = useLiveQuery((q) => q.from({ pl: publisherLocalCollection }), []);

  const all_publishers = (publishers ?? []) as Publisher[];
  const all_local = (local_data ?? []) as PublisherLocal[];

  const local_map = new Map<string, PublisherLocal>();
  for (const l of all_local) {
    local_map.set(l.publisher_id, l);
  }

  const with_missing: PublisherWithMissingDetails[] = all_publishers
    .filter((p) => p.id && !p.archived_at && p.first_name && p.last_name && p.type !== "speaker")
    .map((p) => {
      const local = local_map.get(p.id!) ?? null;
      return {
        publisher: p,
        local,
        missing_details: getMissingDetails(p, local),
      };
    })
    .filter((row) => row.missing_details.length > 0)
    .sort(sortByLastName);

  const filtered =
    filter === "all"
      ? with_missing
      : with_missing.filter((row) => row.missing_details.includes(filter));

  return { publishers: filtered };
}
