import { DateInput } from "../../../../../../ui/components/inputs/date/DateInput.tsx";
import { publisherLocalCollection } from "../../../../index.ts";

interface Props {
  publisher_id: string;
  birth_date: string;
  baptism_date: string;
}

export function PublisherDatesEditable({ publisher_id, birth_date, baptism_date }: Props) {
  return (
    <>
      <DateInput
        label="Date of Birth"
        value={birth_date}
        on_change={(value) =>
          publisherLocalCollection.update(publisher_id, (draft) => {
            draft.birth_date = value;
          })
        }
      />
      <DateInput
        label="Baptism Date"
        value={baptism_date}
        on_change={(value) =>
          publisherLocalCollection.update(publisher_id, (draft) => {
            draft.baptism_date = value;
          })
        }
      />
    </>
  );
}
