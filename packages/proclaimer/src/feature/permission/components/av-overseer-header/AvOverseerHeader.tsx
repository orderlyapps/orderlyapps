import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface AvOverseerHeaderProps {
  on_add: () => void;
}

export function AvOverseerHeader({ on_add }: AvOverseerHeaderProps) {
  return <PermissionHeader title="AV Overseer" on_add={on_add} />;
}
