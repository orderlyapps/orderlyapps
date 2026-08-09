import { useState } from "react";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { useUpdatePublisher } from "../../../../hooks/use-update-publisher.js";
import { usePublishers } from "../../../../hooks/use-publishers.js";
import type { PublisherFilterNode } from "../../../../hooks/use-publishers.js";
import { PublisherSelectModal } from "../../../publisher-select-modal/publisher-select-modal.js";
import { DetailRow } from "../detail-row/detail-row.js";
import { formatPublisherName } from "../../../publisher-name/publisher-name.js";

export interface FamilyDetailRowProps {
  publisher: PublisherRecord;
}

export function FamilyDetailRow({ publisher }: FamilyDetailRowProps) {
  const { update: updatePublisher } = useUpdatePublisher();
  const [isOpen, setIsOpen] = useState(false);
  const familyId = publisher.family_id;

  // The head's `family_id` self-references its own `id`, so querying by
  // `family_id` returns the head and every member in one subscription.
  const { data: family } = usePublishers({
    enabled: Boolean(familyId),
    filter: { column: "family_id", op: "eq", value: familyId ?? "" },
  });

  const head = family.find((p) => p.id === familyId);
  const members = family.filter((p) => p.id !== familyId && p.id !== publisher.id);

  // Only existing family heads (family_id === id) or the publisher themself
  // can be set as this publisher's family head.
  const familyHeadFilter: PublisherFilterNode = {
    or: [
      { column: "id", op: "eq", value: { column: "family_id" } },
      { column: "id", op: "eq", value: publisher.id },
    ],
  };

  return (
    <>
      <DetailRow
        label="Family head"
        value={head ? formatPublisherName(head) : null}
        onClick={() => setIsOpen(true)}
      />
      {members.map((member) => (
        <DetailRow key={member.id} label="Member" value={formatPublisherName(member)} />
      ))}
      <PublisherSelectModal
        isOpen={isOpen}
        selectedId={publisher.family_id}
        title="Set Family Head"
        filter={familyHeadFilter}
        onDismiss={() => setIsOpen(false)}
        onSelect={(selected) => {
          updatePublisher(publisher.id, { family_id: selected.id });
          setIsOpen(false);
        }}
      />
    </>
  );
}
