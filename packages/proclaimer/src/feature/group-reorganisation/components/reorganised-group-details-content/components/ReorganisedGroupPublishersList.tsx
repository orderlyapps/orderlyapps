import { IonList, IonItem, IonLabel } from "@ionic/react";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import { DeleteIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/delete/DeleteIconButton";
import { removePublisherFromGroup } from "../../../utils/reorganised-groups.ts";

interface ReorganisedGroupPublishersListProps {
  group_id: string;
  publishers: Publisher[];
}

export function ReorganisedGroupPublishersList({
  group_id,
  publishers,
}: ReorganisedGroupPublishersListProps) {
  return (
    <>
      <IonItem lines="none" className="ion-margin ion-text-center">
        <IonLabel>
          <Body color="medium" bold>
            {publishers.length} Publisher{publishers.length !== 1 ? "s" : ""}
          </Body>
        </IonLabel>
      </IonItem>

      {publishers.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <Body color="medium">No publishers in this group.</Body>
        </div>
      ) : (
        <IonList>
          <MultiColumnList
            items={publishers}
            get_id={(p) => p.id ?? ""}
            gap="sm"
            render_item={(p) => (
              <IonItem>
                <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
                <DeleteIconButton
                  slot="end"
                  alert_header="Remove Publisher"
                  alert_message={`Remove ${getPublisherDisplayName(p)} from this group?`}
                  confirm_text="Remove"
                  on_click={() => {
                    if (p.id) removePublisherFromGroup(group_id, p.id);
                  }}
                />
              </IonItem>
            )}
          />
        </IonList>
      )}
    </>
  );
}
