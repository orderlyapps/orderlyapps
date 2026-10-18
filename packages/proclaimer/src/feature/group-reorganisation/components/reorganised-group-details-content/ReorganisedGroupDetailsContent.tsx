import { useLiveQuery, eq } from "@tanstack/react-db";
import { useIonRouter, useIonAlert } from "@ionic/react";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { isListablePublisher } from "@amodeo/proclaimer/feature/secretary";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { reorganisedGroupCollection } from "../../collections/reorganised-group.ts";
import type { ReorganisedGroup } from "../../schemas/reorganised-group.ts";
import { ReorganisedGroupForm } from "./components/ReorganisedGroupForm.tsx";
import { ReorganisedGroupPublishersList } from "./components/ReorganisedGroupPublishersList.tsx";
import { AddPublishersModal } from "./components/AddPublishersModal.tsx";

interface ReorganisedGroupDetailsContentProps {
  group_id: string;
  is_add_modal_open: boolean;
  on_dismiss: () => void;
}

const sortPublishers = (a: Publisher, b: Publisher) => {
  const last = a.last_name.localeCompare(b.last_name);
  if (last !== 0) return last;
  const a_first = a.display_name ?? a.first_name;
  const b_first = b.display_name ?? b.first_name;
  return a_first.localeCompare(b_first);
};

export function ReorganisedGroupDetailsContent({
  group_id,
  is_add_modal_open,
  on_dismiss,
}: ReorganisedGroupDetailsContentProps) {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const congregation_id = getStoredCongregation()?.id;

  const { data: group_data, isLoading: is_group_loading } = useLiveQuery((q) =>
    q.from({ g: reorganisedGroupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const { data: all_groups_data } = useLiveQuery((q) => q.from({ g: reorganisedGroupCollection }));

  const { data: publishers_data, isLoading: is_publishers_loading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const group = group_data?.[0] as ReorganisedGroup | undefined;

  const publishers = (
    (publishers_data ?? []).filter(
      (p) => p.id && p.congregation_id === congregation_id,
    ) as Publisher[]
  ).sort(sortPublishers);

  const publisher_map = new Map(publishers.map((p) => [p.id, p]));

  const members = (group?.member_ids ?? [])
    .map((id) => publisher_map.get(id))
    .filter((p): p is Publisher => !!p && isListablePublisher(p, true))
    .sort(sortPublishers);

  const assigned_ids = new Set(
    ((all_groups_data ?? []) as ReorganisedGroup[])
      .filter((g) => g.congregation_id === congregation_id)
      .flatMap((g) => g.member_ids),
  );

  if (is_group_loading || is_publishers_loading) {
    return <Spinner />;
  }

  if (!group) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">Group not found.</Body>
      </div>
    );
  }

  const handle_delete = () => {
    void presentAlert({
      header: "Delete Group",
      message: `Delete "${group.name}"? This only affects the temporary list.`,
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          role: "confirm",
          handler: () => {
            reorganisedGroupCollection.delete(group_id);
            router.push("/home/secretary/reorganise-groups");
          },
        },
      ],
    });
  };

  return (
    <>
      <ReorganisedGroupForm
        group_id={group_id}
        name={group.name}
        overseer_id={group.overseer_id}
        assistant_id={group.assistant_id}
        publishers={members}
      />

      <ReorganisedGroupPublishersList group_id={group_id} publishers={members} />

      <Space />

      <TextButton expand="block" color="danger" on_click={handle_delete} label="Delete Group" />

      <AddPublishersModal
        is_open={is_add_modal_open}
        group_id={group_id}
        publishers={publishers.filter(
          (p) => !group.member_ids.includes(p.id!) && isListablePublisher(p, true),
        )}
        assigned_ids={assigned_ids}
        on_dismiss={on_dismiss}
      />
    </>
  );
}
