import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { reorganisedGroupCollection } from "../../collections/reorganised-group.ts";

interface ReorganisedGroupDetailsHeaderProps {
  group_id: string;
  on_add_click: () => void;
}

export function ReorganisedGroupDetailsHeader({
  group_id,
  on_add_click,
}: ReorganisedGroupDetailsHeaderProps) {
  const { data } = useLiveQuery((q) =>
    q.from({ g: reorganisedGroupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const group = data?.[0];

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary/reorganise-groups" />
      </IonButtons>
      <IonTitle>{group ? group.name : "Group"}</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={on_add_click} />
      </IonButtons>
    </IonToolbar>
  );
}
