import { VisitingSpeakersList } from "../visiting-speakers-list/VisitingSpeakersList.tsx";

type VisitingSpeakersContentProps = {
  search: string;
};

export function VisitingSpeakersContent({ search }: VisitingSpeakersContentProps) {
  return <VisitingSpeakersList search={search} />;
}
