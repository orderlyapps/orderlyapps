import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface MeetingAttendanceHeaderProps {
  on_add: () => void;
}

export function MeetingAttendanceHeader({ on_add }: MeetingAttendanceHeaderProps) {
  return <PermissionHeader title="Meeting Attendance" on_add={on_add} />;
}
