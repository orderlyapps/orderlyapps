import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface MinisterialServantHeaderProps {
  on_add: () => void;
}

export function MinisterialServantHeader({ on_add }: MinisterialServantHeaderProps) {
  return <PermissionHeader title="Ministerial Servant" on_add={on_add} />;
}
