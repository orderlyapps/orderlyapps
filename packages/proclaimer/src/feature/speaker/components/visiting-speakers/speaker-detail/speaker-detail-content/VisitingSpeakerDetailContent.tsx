import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { SpeakerInfoForm } from "./components/speaker-info-form/SpeakerInfoForm.tsx";
import { SpeakerOutlinesList } from "./components/speaker-outlines-list/SpeakerOutlinesList.tsx";

interface VisitingSpeakerDetailContentProps {
  speaker_id: string;
}

export function VisitingSpeakerDetailContent({ speaker_id }: VisitingSpeakerDetailContentProps) {
  const { data: speaker_data } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, speaker_id)),
    [speaker_id],
  );

  const speaker = (speaker_data as Publisher[] | undefined)?.[0];

  if (!speaker) return null;

  return (
    <>
      <SpeakerInfoForm speaker={speaker} />
      <SpeakerOutlinesList speaker_id={speaker_id} />
    </>
  );
}
