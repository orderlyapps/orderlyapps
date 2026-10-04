import { useLiveQuery, eq } from "@tanstack/react-db";
import { IonCol, IonGrid, IonItem, IonRow } from "@ionic/react";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { RESPONSIVE_COL_SIZES } from "../../../../ui/types/responsive-col-sizes.ts";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { publisherCollection } from "../../collections/publisher.ts";
import { getPublisherDisplayName } from "../../utils/publisher-name.ts";

interface PublishersProps {
  base_path: string;
}

export function Publishers({ base_path }: PublishersProps) {
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

  const publishers = data ?? [];

  if (publishers.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">No publishers found.</Body>
      </div>
    );
  }

  return (
    <IonGrid>
      <IonRow>
        {publishers.map((p) => (
          <IonCol key={p.id} {...RESPONSIVE_COL_SIZES}>
            <IonItem routerLink={`${base_path}/${p.id}`} button>
              {getPublisherDisplayName(p)}
            </IonItem>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}
