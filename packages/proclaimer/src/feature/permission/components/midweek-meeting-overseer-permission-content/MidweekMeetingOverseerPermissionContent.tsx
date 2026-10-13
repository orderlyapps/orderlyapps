import { useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingOverseerPermissionCollection } from "@amodeo/proclaimer/feature/midweek-meeting";
import { usePermittedPublishers } from "../../hooks/use-permitted-publishers.ts";
import { PermissionContent } from "../permission-content/PermissionContent.tsx";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal.tsx";

interface MidweekMeetingOverseerContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function MidweekMeetingOverseerPermissionContent({
  show_add_modal,
  on_dismiss_add_modal,
}: MidweekMeetingOverseerContentProps) {
  const { data: permissions } = useLiveQuery((q) =>
    q.from({ cp: midweekMeetingOverseerPermissionCollection }),
  );

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      midweekMeetingOverseerPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with CLAM overseer permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
