import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface WatchtowerHeaderProps {
  on_add: () => void;
}

export function WatchtowerHeader({ on_add }: WatchtowerHeaderProps) {
  return <PermissionHeader title="Watchtower" on_add={on_add} />;
}
