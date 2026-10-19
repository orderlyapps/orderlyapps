import { getStoredPublisher } from "../../publisher/utils/stored-publisher.ts";
import type { Version } from "../schemas/publisher-local.ts";

function currentUserId(): string {
  return getStoredPublisher()?.id ?? "";
}

export function createVersion(): Version {
  const user = currentUserId();
  const now = Date.now();
  return { created_by: user, updated_by: user, created_at: now, updated_at: now };
}

export function touchVersion(version: Version): Version {
  return { ...version, updated_by: currentUserId(), updated_at: Date.now() };
}
