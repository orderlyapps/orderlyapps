import { useState } from "react";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { useUpdatePublisher } from "../../../../hooks/use-update-publisher.js";
import { PublisherSelectModal } from "../../../publisher-select-modal/publisher-select-modal.js";
import { DetailRow } from "../detail-row/detail-row.js";

export interface FamilyDetailRowProps {
  publisher: PublisherRecord;
}

export function FamilyDetailRow({ publisher }: FamilyDetailRowProps) {
  const { update: updatePublisher } = useUpdatePublisher();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DetailRow label="Family" value={publisher.family_id} onClick={() => setIsOpen(true)} />
      <PublisherSelectModal
        isOpen={isOpen}
        selectedId={publisher.family_id}
        title="Set Family Head"
        onDismiss={() => setIsOpen(false)}
        onSelect={(head) => {
          updatePublisher(publisher.id, { family_id: head.id });
          setIsOpen(false);
        }}
      />
    </>
  );
}
