import { CongregationDetails } from "@amodeo/proclaimer";
import { useParams } from "react-router-dom";

export function CongregationContent() {
  const { id } = useParams<{ id: string }>();

  return (
    <CongregationDetails
      id={id}
      congregationRoutePrefix="/home/proclaimer/features/congregations/all"
    />
  );
}
