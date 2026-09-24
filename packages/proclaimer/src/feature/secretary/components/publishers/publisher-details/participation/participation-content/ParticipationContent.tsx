import { useLiveQuery } from "@tanstack/react-db";
import { avParticipationCollection } from "@amodeo/proclaimer/feature/av";
import { midweekParticipationCollection } from "@amodeo/proclaimer/feature/midweek";
import { weekendParticipationCollection } from "@amodeo/proclaimer/feature/weekend";
import { avParticipationTypeLabels } from "@amodeo/proclaimer/feature/av";
import { weekendParticipationTypeLabels } from "@amodeo/proclaimer/feature/weekend";
import { midweekParticipationTypeLabels } from "@amodeo/proclaimer/feature/midweek";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { ParticipationSection } from "./components/participation-section/ParticipationSection.tsx";

export function ParticipationContent({ publisher_id }: { publisher_id: string }) {
  const { data: av, isLoading: isLoadingAv } = useLiveQuery((q) =>
    q.from({ ap: avParticipationCollection }),
  );
  const { data: midweek, isLoading: isLoadingMidweek } = useLiveQuery((q) =>
    q.from({ mp: midweekParticipationCollection }),
  );
  const { data: weekend, isLoading: isLoadingWeekend } = useLiveQuery((q) =>
    q.from({ wp: weekendParticipationCollection }),
  );

  const avParticipation = (av ?? []).filter((p) => p.participant_id === publisher_id);
  const midweekParticipation = (midweek ?? []).filter(
    (p) => p.participant_id === publisher_id && p.is_participant,
  );
  const weekendParticipation = (weekend ?? []).filter((p) => p.participant_id === publisher_id);

  if (isLoadingAv || isLoadingMidweek || isLoadingWeekend) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const hasNoParticipation =
    avParticipation.length === 0 &&
    midweekParticipation.length === 0 &&
    weekendParticipation.length === 0;

  if (hasNoParticipation) {
    return (
      <>
        <div className="ion-padding ion-text-center">
          <Body color="medium">No participation records found.</Body>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="ion-padding">
        <ParticipationSection
          title="AV"
          participations={avParticipation}
          labels={avParticipationTypeLabels}
        />
        <ParticipationSection
          title="Midweek Meeting"
          participations={midweekParticipation}
          labels={midweekParticipationTypeLabels}
        />
        <ParticipationSection
          title="Weekend Meeting"
          participations={weekendParticipation}
          labels={weekendParticipationTypeLabels}
        />
      </div>
    </>
  );
}
