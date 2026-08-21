import type { PublisherRecord } from "../../publisher-schema.js";

const NAME_FIELDS = ["display_name", "middle_name", "first_name", "last_name"] as const;
type NameField = (typeof NAME_FIELDS)[number];

// Match longer field names first so "display_name" wins over "first_name" etc.
const FIELD_PATTERN = new RegExp(
  NAME_FIELDS.slice()
    .sort((a, b) => b.length - a.length)
    .join("|"),
  "g",
);

export type PublisherNameFormat =
  | "last_name, display_name"
  | "display_name last_name"
  | "first_name (display_name) middle_name last_name"
  | "first_name last_name";

const DEFAULT_FORMAT: PublisherNameFormat = "display_name last_name";
const FALLBACK_FORMAT: PublisherNameFormat = "first_name last_name";

export type PublisherNameFields = Pick<
  PublisherRecord,
  "first_name" | "middle_name" | "last_name" | "display_name"
>;

function applyFormat(name: PublisherNameFields, format: PublisherNameFormat): string {
  const values: Record<NameField, string> = {
    display_name: name.display_name ?? name.first_name,
    middle_name: name.middle_name ?? "",
    first_name: name.first_name,
    last_name: name.last_name,
  };

  let template: string = format;
  if (
    format === "first_name (display_name) middle_name last_name" &&
    (values.display_name === values.middle_name || values.display_name === values.first_name)
  ) {
    template = "first_name middle_name last_name";
  }

  return template
    .replace(FIELD_PATTERN, (match) => values[match as NameField])
    .replace(/\(\s*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatPublisherName(
  name: PublisherNameFields,
  format: PublisherNameFormat = DEFAULT_FORMAT,
): string {
  const result = applyFormat(name, format);
  if (result) return result;
  if (format !== FALLBACK_FORMAT) return applyFormat(name, FALLBACK_FORMAT);
  return result;
}

export interface PublisherNameProps {
  publisher: PublisherRecord;
  format?: PublisherNameFormat;
}

export function PublisherName({ publisher, format }: PublisherNameProps) {
  const name = formatPublisherName(publisher, format);
  return <>{name}</>;
}
