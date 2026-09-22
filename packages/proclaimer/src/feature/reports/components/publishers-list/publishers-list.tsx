import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection, getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { IonList, IonItem } from "@ionic/react";

export function PublishersList({ base_path }: { base_path: string }) {
  const congregation_id = useStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .where(({ p }) => eq(p.congregation_id, congregation_id ?? ""))
        .orderBy(({ p }) => p.last_name)
        .orderBy(({ p }) => p.first_name),
    [congregation_id],
  );

  if (isLoading) {
    return <Spinner />;
  }

  const publishers = (data ?? []).filter((p) => p.id != null && !p.archived_at);

  if (publishers.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">No publishers found.</Body>
      </div>
    );
  }

  return (
    <IonList>
      <MultiColumnList
        items={publishers}
        get_id={(p) => p.id ?? ""}
        gap="sm"
        render_item={(p) => (
          <IonItem routerLink={`${base_path}/${p.id}`} button>
            {getPublisherDisplayName(p)}
          </IonItem>
        )}
      />
    </IonList>
  );
}
