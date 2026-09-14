import { useLiveQuery } from "@tanstack/react-db";
import { meetingAttendancePermissionCollection } from "@amodeo/proclaimer/feature/meeting-attendance";
import { usePermittedPublishers } from "../../hooks/use-permitted-publishers.ts";
import { PermissionContent } from "../permission-content/PermissionContent.tsx";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal.tsx";

interface MeetingAttendanceContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function MeetingAttendanceContent({
  show_add_modal,
  on_dismiss_add_modal,
}: MeetingAttendanceContentProps) {
  const { data: permissions } = useLiveQuery((q) =>
    q.from({ map: meetingAttendancePermissionCollection }),
  );

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      meetingAttendancePermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with meeting attendance permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
