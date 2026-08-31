interface PublisherName {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  display_name?: string | null;
}

export function getPublisherDisplayName(publisher: PublisherName): string {
  const first = publisher.first_name;
  const last = publisher.last_name;
  const middle = publisher.middle_name ?? "";
  return `${first}${publisher.display_name ? " (" + publisher.display_name + ")" : ""}${middle ? " " + middle : ""} ${last}`;
}
