export function formatAddressNumber(address: {
  house_number: string;
  unit_number?: string | null;
}): string {
  const unit = address.unit_number?.trim();
  return unit ? `${unit}/${address.house_number}` : address.house_number;
}
