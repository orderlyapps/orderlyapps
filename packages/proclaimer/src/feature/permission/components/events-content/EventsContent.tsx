import { useLiveQuery } from "@tanstack/react-db";
import { eventPermissionCollection } from "@amodeo/proclaimer/feature/event";
import { usePermittedPublishers } from "../../hooks/use-permitted-publishers.ts";
import { PermissionContent } from "../permission-content/PermissionContent.tsx";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal.tsx";

interface EventsContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function EventsContent({ show_add_modal, on_dismiss_add_modal }: EventsContentProps) {
  const { data: permissions } = useLiveQuery((q) => q.from({ ep: eventPermissionCollection }));

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      eventPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with events permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
