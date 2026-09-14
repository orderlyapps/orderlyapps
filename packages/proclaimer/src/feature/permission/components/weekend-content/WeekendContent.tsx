import { useLiveQuery } from "@tanstack/react-db";
import { weekendPermissionCollection } from "@amodeo/proclaimer/feature/weekend";
import { usePermittedPublishers } from "../../hooks/use-permitted-publishers.ts";
import { PermissionContent } from "../permission-content/PermissionContent.tsx";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal.tsx";

interface WeekendContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function WeekendContent({ show_add_modal, on_dismiss_add_modal }: WeekendContentProps) {
  const { data: permissions } = useLiveQuery((q) => q.from({ wp: weekendPermissionCollection }));

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      weekendPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with weekend permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
