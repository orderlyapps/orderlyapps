import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface CobeHeaderProps {
  on_add: () => void;
}

export function CobeHeader({ on_add }: CobeHeaderProps) {
  return <PermissionHeader title="COBE" on_add={on_add} />;
}
