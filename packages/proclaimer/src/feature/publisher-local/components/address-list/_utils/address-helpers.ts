import type { Address } from "../../../index.ts";
import type { AddressValue } from "../../../../../ui/components/inputs/address/types.ts";

type AddressEntry = NonNullable<Address>[number];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function resolveName(
  value: string | undefined,
  lookup: { id?: string; name: string }[],
): { id: string; name: string } | undefined {
  if (!value) return undefined;
  if (UUID_RE.test(value)) {
    const found = lookup.find((s) => s.id === value);
    return found ? { id: found.id!, name: found.name } : { id: value, name: value };
  }
  return { id: value, name: value };
}

export function toAddressValue(
  entry: AddressEntry,
  suburbs: { id?: string; name: string; bbox?: number[] }[],
  streets: { id?: string; name: string }[],
): AddressValue | undefined {
  const suburb = resolveName(entry.suburb, suburbs);
  if (!suburb) return undefined;
  const suburbRecord = suburbs.find((s) => s.id === suburb.id);
  const street = resolveName(entry.street, streets);
  return {
    suburb: { id: suburb.id, name: suburb.name, bbox: suburbRecord?.bbox },
    street,
    house_number: entry.house_number,
    unit_number: entry.unit_number,
    coordinates: entry.coordinates,
  };
}

export function formatDisplayValue(
  entry: AddressEntry,
  suburbs: { id?: string; name: string }[],
  streets: { id?: string; name: string }[],
): string {
  const street = resolveName(entry.street, streets);
  const suburb = resolveName(entry.suburb, suburbs);
  const numberPart =
    entry.unit_number && entry.house_number
      ? `${entry.unit_number}/${entry.house_number}`
      : entry.unit_number || entry.house_number;
  const parts = [numberPart, street?.name, suburb?.name].filter(Boolean);
  return parts.join(" ") || "-";
}
