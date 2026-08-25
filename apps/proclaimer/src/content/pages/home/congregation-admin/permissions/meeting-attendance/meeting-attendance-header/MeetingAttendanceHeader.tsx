import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface MeetingAttendanceHeaderProps {
  on_add: () => void;
}

export function MeetingAttendanceHeader({ on_add }: MeetingAttendanceHeaderProps) {
  return <PermissionHeader title="Meeting Attendance" on_add={on_add} />;
}
