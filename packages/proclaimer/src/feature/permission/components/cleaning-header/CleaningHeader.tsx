import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface CleaningHeaderProps {
  on_add: () => void;
}

export function CleaningHeader({ on_add }: CleaningHeaderProps) {
  return <PermissionHeader title="Cleaning" on_add={on_add} />;
}
