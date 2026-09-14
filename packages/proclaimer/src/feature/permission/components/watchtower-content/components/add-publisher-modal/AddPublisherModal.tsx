import { useLiveQuery } from "@tanstack/react-db";
import { watchtowerPermissionCollection } from "../../../../collections/watchtower-permission.ts";
import { useAddPermission } from "../../../../hooks/use-add-permission.ts";
import { GenericPermissionModal } from "../../../generic-permission-modal/GenericPermissionModal.tsx";

interface AddPublisherModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddPublisherModal({ is_open, on_dismiss }: AddPublisherModalProps) {
  const { data: permissions } = useLiveQuery((q) => q.from({ wp: watchtowerPermissionCollection }));

  const { handleAdd } = useAddPermission({
    permissions,
    on_insert: (auth_user_id, congregation_id) =>
      watchtowerPermissionCollection.insert({ auth_user_id, congregation_id, can_edit: true }),
    on_update: (key) =>
      watchtowerPermissionCollection.update(key, (draft) => {
        draft.can_edit = true;
      }),
    on_dismiss,
  });

  return (
    <GenericPermissionModal
      is_open={is_open}
      on_dismiss={on_dismiss}
      permissions={permissions}
      on_add_permission={handleAdd}
      modal_title="Add Watchtower"
    />
  );
}
