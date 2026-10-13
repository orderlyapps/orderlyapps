import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface MidweekMeetingOverseerHeaderProps {
  on_add: () => void;
}

export function MidweekMeetingOverseerPermissionHeader({
  on_add,
}: MidweekMeetingOverseerHeaderProps) {
  return <PermissionHeader title="CLAM Overseer" on_add={on_add} />;
}
