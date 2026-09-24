import { IonList } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@amodeo/proclaimer/feature/publisher";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";
import { PublisherPublicSection } from "./components/publisher-public-section/PublisherPublicSection.tsx";
import { PublisherLocalSection } from "./components/publisher-local-section/PublisherLocalSection.tsx";
import { PublisherPioneerSection } from "@amodeo/proclaimer/feature/regular-pioneer";
import { ArchivePublisherButton } from "./components/archive-publisher-button/ArchivePublisherButton.tsx";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

export function PublisherDetailsContent({
  publisher_id,
  read_only = false,
  reports_path,
  assignments_path,
  participation_path,
}: {
  publisher_id: string;
  read_only?: boolean;
  reports_path?: string;
  assignments_path?: string;
  participation_path?: string;
}) {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
  );

  const publisher = data?.[0];

  if (isLoading) {
    return <Spinner />;
  }

  if (!publisher) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">Publisher not found.</Body>
      </div>
    );
  }

  return (
    <IonList>
      <PublisherPublicSection
        publisher_id={publisher_id}
        publisher={publisher}
        read_only={read_only}
      />

      <PublisherLocalSection publisher_id={publisher_id} read_only={read_only} />

      <PublisherPioneerSection publisher_id={publisher_id} read_only={read_only} />

      <Space />

      <ArchivePublisherButton
        publisher_id={publisher_id}
        archived_at={publisher.archived_at}
        read_only={read_only}
      />

      {reports_path && publisher.type !== "circuit_overseer" && (
        <NavItem
          label="Publisher Record"
          to={reports_path}
          lines="none"
          label_class="ion-text-end"
          color="medium"
          size="md"
        />
      )}

      {assignments_path && publisher.type !== "circuit_overseer" && (
        <NavItem
          label="Assignments"
          to={assignments_path}
          lines="none"
          label_class="ion-text-end"
          color="medium"
          size="md"
        />
      )}

      {participation_path && publisher.type !== "circuit_overseer" && (
        <NavItem
          label="Participation"
          to={participation_path}
          lines="none"
          label_class="ion-text-end"
          color="medium"
          size="md"
        />
      )}
    </IonList>
  );
}
