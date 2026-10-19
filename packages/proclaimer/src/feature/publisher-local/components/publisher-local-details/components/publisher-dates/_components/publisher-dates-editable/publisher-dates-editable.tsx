import { DateInput } from "../../../../../../../../ui/components/inputs/date/DateInput.tsx";
import { upsertPublisherLocal, createVersion, touchVersion } from "../../../../../../index.ts";

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
          upsertPublisherLocal(publisher_id, (draft) => {
            draft.birth_date = {
              value,
              version: draft.birth_date?.version
                ? touchVersion(draft.birth_date.version)
                : createVersion(),
            };
            draft.version = touchVersion(draft.version);
          })
        }
      />
      <DateInput
        label="Baptism Date"
        value={baptism_date}
        on_change={(value) =>
          upsertPublisherLocal(publisher_id, (draft) => {
            draft.baptism_date = {
              value,
              version: draft.baptism_date?.version
                ? touchVersion(draft.baptism_date.version)
                : createVersion(),
            };
            draft.version = touchVersion(draft.version);
          })
        }
      />
    </>
  );
}
