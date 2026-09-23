import { useLocalSpeakers } from "../../../hooks/use-local-speakers.ts";
import { SpeakerList } from "../../speaker-list/SpeakerList.tsx";
import type { SpeakerListItem } from "../../speaker-list/SpeakerList.tsx";

export function LocalSpeakersList() {
  const { local_speakers, is_loading } = useLocalSpeakers();

  function getHref(speaker: SpeakerListItem) {
    return `/home/speaker/local-speakers/${speaker.id}`;
  }

  return (
    <SpeakerList
      speakers={local_speakers}
      empty_label="No local speakers"
      is_loading={is_loading}
      get_href={getHref}
    />
  );
}
