import { useVisitingSpeakers } from "../../../hooks/use-visiting-speakers.ts";
import { SpeakerList } from "../../speaker-list/SpeakerList.tsx";
import type { SpeakerListItem } from "../../speaker-list/SpeakerList.tsx";
import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";

type VisitingSpeakersListProps = {
  search: string;
};

export function VisitingSpeakersList({ search }: VisitingSpeakersListProps) {
  const { visiting_speakers, is_loading } = useVisitingSpeakers();

  const query = search.trim().toLowerCase();

  const filtered = query
    ? visiting_speakers.filter((speaker) => {
        const name = getPublisherDisplayName(speaker).toLowerCase();
        const congregation = (speaker.congregation_name ?? "").toLowerCase();
        return name.includes(query) || congregation.includes(query);
      })
    : visiting_speakers;

  const items = filtered.map((speaker) => ({
    ...speaker,
    subtitle: speaker.congregation_name,
  }));

  function getHref(speaker: SpeakerListItem) {
    return `/home/speaker/visiting-speakers/${speaker.id}`;
  }

  return (
    <SpeakerList
      speakers={items}
      empty_label="No visiting speakers"
      is_loading={is_loading}
      get_href={getHref}
    />
  );
}
