import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface SecretaryHeaderProps {
  on_add: () => void;
}

export function SecretaryHeader({ on_add }: SecretaryHeaderProps) {
  return <PermissionHeader title="Secretary" on_add={on_add} />;
}
