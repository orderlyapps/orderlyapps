import { useLiveQuery } from "@tanstack/react-db";
import { serviceOverseerPermissionCollection } from "../../collections/service-overseer-permission.ts";
import { usePermittedPublishers } from "../../hooks/use-permitted-publishers.ts";
import { PermissionContent } from "../permission-content/PermissionContent.tsx";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal.tsx";

interface ServiceOverseerContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function ServiceOverseerContent({
  show_add_modal,
  on_dismiss_add_modal,
}: ServiceOverseerContentProps) {
  const { data: permissions } = useLiveQuery((q) =>
    q.from({ sp: serviceOverseerPermissionCollection }),
  );

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      serviceOverseerPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with service overseer permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
