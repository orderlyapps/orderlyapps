import { useLiveQuery } from "@tanstack/react-db";
import { elderPermissionCollection } from "../../collections/elder-permission.ts";
import { usePermittedPublishers } from "../../hooks/use-permitted-publishers.ts";
import { PermissionContent } from "../permission-content/PermissionContent.tsx";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal.tsx";

interface ElderContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function ElderContent({ show_add_modal, on_dismiss_add_modal }: ElderContentProps) {
  const { data: permissions } = useLiveQuery((q) => q.from({ ep: elderPermissionCollection }));

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      elderPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with elder permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
