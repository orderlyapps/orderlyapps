import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface ClamOverseerHeaderProps {
  on_add: () => void;
}

export function ClamOverseerHeader({ on_add }: ClamOverseerHeaderProps) {
  return <PermissionHeader title="CLAM Overseer" on_add={on_add} />;
}
