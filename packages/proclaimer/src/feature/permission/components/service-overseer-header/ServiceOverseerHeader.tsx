import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface ServiceOverseerHeaderProps {
  on_add: () => void;
}

export function ServiceOverseerHeader({ on_add }: ServiceOverseerHeaderProps) {
  return <PermissionHeader title="Service Overseer" on_add={on_add} />;
}
