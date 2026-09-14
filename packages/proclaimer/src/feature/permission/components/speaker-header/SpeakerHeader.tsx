import { PermissionHeader } from "../permission-header/PermissionHeader.tsx";

interface SpeakerHeaderProps {
  on_add: () => void;
}

export function SpeakerHeader({ on_add }: SpeakerHeaderProps) {
  return <PermissionHeader title="Speaker" on_add={on_add} />;
}
