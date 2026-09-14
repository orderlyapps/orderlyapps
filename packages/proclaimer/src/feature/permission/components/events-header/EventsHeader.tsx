import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface EventsHeaderProps {
  on_add: () => void;
}

export function EventsHeader({ on_add }: EventsHeaderProps) {
  return <PermissionHeader title="Events" on_add={on_add} />;
}
