import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";

export function useLocalSpeakers() {
  const congregation_id = useStoredCongregation()?.id ?? "";

  const { data: all_publishers, isLoading } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
    [],
  );

  const local_speakers = ((all_publishers as Publisher[] | undefined) ?? []).filter(
    (p) =>
      !p.archived_at &&
      p.gender === "male" &&
      p.congregation_id === congregation_id &&
      (p.standing === "elder" || p.standing === "ministerial_servant"),
  );

  return { local_speakers, is_loading: isLoading };
}
