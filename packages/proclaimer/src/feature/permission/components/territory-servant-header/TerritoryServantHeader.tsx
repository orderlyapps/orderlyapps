import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface TerritoryServantHeaderProps {
  on_add: () => void;
}

export function TerritoryServantHeader({ on_add }: TerritoryServantHeaderProps) {
  return <PermissionHeader title="Territory Servant" on_add={on_add} />;
}
