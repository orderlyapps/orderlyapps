import { PublisherDatesReadOnly } from "./_components/publisher-dates-read-only/publisher-dates-read-only.tsx";
import { PublisherDatesEditable } from "./_components/publisher-dates-editable/publisher-dates-editable.tsx";

interface Props {
  publisher_id: string;
  birth_date?: string;
  baptism_date?: string;
  read_only?: boolean;
}

export function PublisherDates({
  publisher_id,
  birth_date = "",
  baptism_date = "",
  read_only = false,
}: Props) {
  if (read_only) {
    return <PublisherDatesReadOnly birth_date={birth_date} baptism_date={baptism_date} />;
  }

  return (
    <PublisherDatesEditable
      publisher_id={publisher_id}
      birth_date={birth_date}
      baptism_date={baptism_date}
    />
  );
}
