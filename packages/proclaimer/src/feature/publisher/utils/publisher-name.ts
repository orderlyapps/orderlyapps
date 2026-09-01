import type { Publisher } from "../schemas/publisher.ts";

export interface PublisherName {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  display_name?: string | null;
}

export type NameFormat =
  | "complete"
  | "last_first"
  | "first_last"
  | "last_first_middle"
  | "first_middle_last";

export function getPublisherDisplayName(
  publisher: Publisher | PublisherName,
  format: NameFormat = "last_first",
): string {
  const first = publisher.display_name ?? publisher.first_name;
  const last = publisher.last_name;
  const middle = publisher.middle_name ?? "";

  switch (format) {
    case "complete":
      return `${publisher.first_name}${publisher.display_name ? " (" + publisher.display_name + ")" : ""}${middle ? " " + middle : ""} ${last}`;
    case "first_last":
      return `${first} ${last}`;
    case "last_first_middle":
      return middle ? `${last}, ${first} ${middle}` : `${last}, ${first}`;
    case "first_middle_last":
      return middle ? `${first} ${middle} ${last}` : `${first} ${last}`;
    case "last_first":
    default:
      return `${last}, ${first}`;
  }
}
