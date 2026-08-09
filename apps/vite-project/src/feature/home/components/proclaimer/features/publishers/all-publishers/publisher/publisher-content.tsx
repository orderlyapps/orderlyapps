import { PublisherDetails } from "@amodeo/proclaimer";
import { useParams } from "react-router-dom";

export function PublisherContent() {
  const { id } = useParams<{ id: string }>();

  return (
    <PublisherDetails id={id} publisherRoutePrefix="/home/proclaimer/features/publishers/all" />
  );
}
