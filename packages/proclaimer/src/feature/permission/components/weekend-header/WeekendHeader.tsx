import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface WeekendHeaderProps {
  on_add: () => void;
}

export function WeekendHeader({ on_add }: WeekendHeaderProps) {
  return <PermissionHeader title="Weekend" on_add={on_add} />;
}
