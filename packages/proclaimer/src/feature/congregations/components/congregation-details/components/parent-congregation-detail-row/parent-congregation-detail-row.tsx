import type { CongregationRecord } from "../../../../congregation-schema.js";
import { useCongregation } from "../../../../hooks/use-congregation.js";
import { DetailRow } from "../detail-row/detail-row.js";

export interface ParentCongregationDetailRowProps {
  congregation: CongregationRecord;
  congregationRoutePrefix?: string;
}

export function ParentCongregationDetailRow({
  congregation,
  congregationRoutePrefix,
}: ParentCongregationDetailRowProps) {
  const parentId = congregation.congregation_id;
  const { data: parent } = useCongregation(parentId ?? undefined);

  return (
    <DetailRow
      label="Parent congregation"
      value={parent?.name ?? null}
      routerLink={
        parent && congregationRoutePrefix ? `${congregationRoutePrefix}/${parent.id}` : undefined
      }
    />
  );
}
