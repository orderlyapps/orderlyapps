import { IonItem, IonCheckbox, IonList, IonListHeader, IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { outlineCollection } from "@amodeo/proclaimer/feature/speaker";
import { speakerOutlineCollection } from "@amodeo/proclaimer/feature/speaker";
import { makeCompositeKey } from "@amodeo/proclaimer/database/util/composite-key";
import type { Outline } from "@amodeo/proclaimer/feature/speaker";
import type { SpeakerOutline } from "@amodeo/proclaimer/feature/speaker";

interface SpeakerDetailContentProps {
  speaker_id: string;
}

export function SpeakerDetailContent({ speaker_id }: SpeakerDetailContentProps) {
  const { data: all_outlines } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).orderBy(({ o }) => o.id),
  );

  const { data: speaker_outlines } = useLiveQuery(
    (q) =>
      q.from({ so: speakerOutlineCollection }).where(({ so }) => eq(so.speaker_id, speaker_id)),
    [speaker_id],
  );

  const outlines = (all_outlines as Outline[] | undefined) ?? [];
  const speaker_outline_ids = new Set(
    ((speaker_outlines as SpeakerOutline[] | undefined) ?? []).map((so) => so.outline_id),
  );

  function handleToggle(outline_id: string, is_checked: boolean) {
    const key = makeCompositeKey(speaker_id, outline_id);
    if (is_checked) {
      speakerOutlineCollection.insert({ speaker_id, outline_id });
    } else {
      speakerOutlineCollection.delete(key);
    }
  }

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Outlines</IonLabel>
      </IonListHeader>
      {outlines.map((outline) => (
        <IonItem key={outline.id}>
          <IonCheckbox
            checked={speaker_outline_ids.has(outline.id)}
            onIonChange={(event) => handleToggle(outline.id, event.detail.checked)}
          >
            {outline.id}: {outline.theme}
          </IonCheckbox>
        </IonItem>
      ))}
    </IonList>
  );
}
