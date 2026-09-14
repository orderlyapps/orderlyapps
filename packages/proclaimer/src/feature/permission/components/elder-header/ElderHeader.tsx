import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface ElderHeaderProps {
  on_add: () => void;
}

export function ElderHeader({ on_add }: ElderHeaderProps) {
  return <PermissionHeader title="Elder" on_add={on_add} />;
}
