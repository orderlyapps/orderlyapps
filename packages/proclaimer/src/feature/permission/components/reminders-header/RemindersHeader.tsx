import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface RemindersHeaderProps {
  on_add: () => void;
}

export function RemindersHeader({ on_add }: RemindersHeaderProps) {
  return <PermissionHeader title="Reminders" on_add={on_add} />;
}
