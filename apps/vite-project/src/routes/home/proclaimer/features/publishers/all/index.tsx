import { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  PublisherFilterSelect,
  PublisherList,
  PublisherPresetSelect,
  presetToFilter,
} from "@amodeo/proclaimer";
import type {
  PublisherFilterNode,
  PublisherPresetFilter,
  PublisherTypeFilter,
} from "@amodeo/proclaimer";

export default function AllPublishersPage() {
  const [typeFilter, setTypeFilter] = useState<PublisherTypeFilter>("all");
  const [presetId, setPresetId] = useState<PublisherPresetFilter>("all");

  const typeNode: PublisherFilterNode | undefined =
    typeFilter === "all" ? undefined : { column: "type", op: "eq", value: typeFilter };
  const presetNode = presetToFilter(presetId);

  const filter: PublisherFilterNode | PublisherFilterNode[] | undefined = (() => {
    if (typeNode && presetNode)
      return { and: [typeNode, ...(Array.isArray(presetNode) ? presetNode : [presetNode])] };
    return typeNode ?? presetNode;
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/proclaimer/features/publishers" />
          </IonButtons>
          <IonTitle>All Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PublisherPresetSelect value={presetId} onChange={setPresetId} />
        <PublisherFilterSelect value={typeFilter} onChange={setTypeFilter} />
        <PublisherList
          publisherRoutePrefix="/home/proclaimer/features/publishers/all"
          filter={filter}
        />
      </IonContent>
    </IonPage>
  );
}
