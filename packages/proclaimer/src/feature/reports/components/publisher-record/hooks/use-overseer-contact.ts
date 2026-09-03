import { useLiveQuery, eq } from "@tanstack/react-db";
import { groupCollection } from "@amodeo/proclaimer/feature/group";
import { publisherLocalCollection } from "@amodeo/proclaimer/feature/publisher-local";

export function useOverseerContact(group_id: string | null) {
  const { data: group } = useLiveQuery(
    (q) => {
      if (!group_id) return undefined;
      return q.from({ g: groupCollection }).where(({ g }) => eq(g.id, group_id));
    },
    [group_id],
  );

  const overseer_id = group?.[0]?.overseer_id ?? null;

  const { data: overseer_local } = useLiveQuery(
    (q) => {
      if (!overseer_id) return undefined;
      return q
        .from({ pl: publisherLocalCollection })
        .where(({ pl }) => eq(pl.publisher_id, overseer_id));
    },
    [overseer_id],
  );

  const phone = overseer_local?.[0]?.phone?.[0]?.number ?? null;

  return { phone, overseer_id };
}
