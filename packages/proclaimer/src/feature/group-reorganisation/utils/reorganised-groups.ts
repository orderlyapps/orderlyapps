import type { Group } from "@amodeo/proclaimer/feature/group";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import type { ReorganisedGroup } from "../schemas/reorganised-group.js";
import { reorganisedGroupCollection } from "../collections/reorganised-group.js";

const seededKey = (congregation_id: string) => `reorganised-groups:seeded:${congregation_id}`;

export function buildSeedGroups(
  congregation_id: string,
  groups: Group[],
  publishers: Publisher[],
): ReorganisedGroup[] {
  return groups
    .filter((g) => g.id && g.congregation_id === congregation_id)
    .map((g) => ({
      id: g.id!,
      congregation_id,
      name: g.name,
      overseer_id: g.overseer_id ?? null,
      assistant_id: g.assistant_id ?? null,
      member_ids: publishers.filter((p) => p.group_id === g.id && p.id).map((p) => p.id!),
    }));
}

export function seedIfEmpty(
  congregation_id: string,
  groups: Group[],
  publishers: Publisher[],
): void {
  if (localStorage.getItem(seededKey(congregation_id))) return;
  const existing = reorganisedGroupCollection.toArray.filter(
    (g) => g.congregation_id === congregation_id,
  );
  if (existing.length > 0) {
    localStorage.setItem(seededKey(congregation_id), "1");
    return;
  }
  const seed = buildSeedGroups(congregation_id, groups, publishers);
  if (seed.length === 0) return;
  reorganisedGroupCollection.insert(seed);
  localStorage.setItem(seededKey(congregation_id), "1");
}

export function resetToCurrentGroups(
  congregation_id: string,
  groups: Group[],
  publishers: Publisher[],
): void {
  const existing = reorganisedGroupCollection.toArray.filter(
    (g) => g.congregation_id === congregation_id,
  );
  for (const g of existing) {
    reorganisedGroupCollection.delete(g.id);
  }
  const seed = buildSeedGroups(congregation_id, groups, publishers);
  if (seed.length > 0) {
    reorganisedGroupCollection.insert(seed);
  }
  localStorage.setItem(seededKey(congregation_id), "1");
}

export function clearAllGroups(congregation_id: string): void {
  const existing = reorganisedGroupCollection.toArray.filter(
    (g) => g.congregation_id === congregation_id,
  );
  for (const g of existing) {
    reorganisedGroupCollection.delete(g.id);
  }
  localStorage.setItem(seededKey(congregation_id), "1");
}

export function addPublisherToGroup(group_id: string, publisher_id: string): void {
  if (!publisher_id) return;
  for (const g of reorganisedGroupCollection.toArray) {
    if (g.id !== group_id && g.member_ids.includes(publisher_id)) {
      removePublisherFromGroup(g.id, publisher_id);
    }
  }
  reorganisedGroupCollection.update(group_id, (draft) => {
    if (!draft.member_ids.includes(publisher_id)) {
      draft.member_ids.push(publisher_id);
    }
  });
}

export function removePublisherFromGroup(group_id: string, publisher_id: string): void {
  if (!publisher_id) return;
  reorganisedGroupCollection.update(group_id, (draft) => {
    draft.member_ids = draft.member_ids.filter((id) => id !== publisher_id);
    if (draft.overseer_id === publisher_id) draft.overseer_id = null;
    if (draft.assistant_id === publisher_id) draft.assistant_id = null;
  });
}

export function getMemberIdsByGroup(groups: ReorganisedGroup[]): Record<string, string[]> {
  return Object.fromEntries(groups.map((g) => [g.id, g.member_ids]));
}
