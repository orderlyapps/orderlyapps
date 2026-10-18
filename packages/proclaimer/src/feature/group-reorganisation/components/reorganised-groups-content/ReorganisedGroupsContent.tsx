import { useEffect } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { IonList, useIonAlert } from "@ionic/react";
import { groupCollection } from "@amodeo/proclaimer/feature/group";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { isListablePublisher } from "@amodeo/proclaimer/feature/secretary";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { reorganisedGroupCollection } from "../../collections/reorganised-group.ts";
import {
  seedIfEmpty,
  resetToCurrentGroups,
  clearAllGroups,
} from "../../utils/reorganised-groups.ts";
import type { ReorganisedGroup } from "../../schemas/reorganised-group.ts";

export function ReorganisedGroupsContent() {
  const [presentAlert] = useIonAlert();
  const congregation_id = getStoredCongregation()?.id;

  const { data: groups_data, isLoading: is_groups_loading } = useLiveQuery((q) =>
    q.from({ g: reorganisedGroupCollection }).orderBy(({ g }) => g.name),
  );

  const { data: canonical_groups, isLoading: is_canonical_loading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }),
  );

  const { data: publishers_data, isLoading: is_publishers_loading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  useEffect(() => {
    if (!congregation_id || is_groups_loading || is_canonical_loading || is_publishers_loading) {
      return;
    }
    seedIfEmpty(congregation_id, canonical_groups ?? [], publishers_data ?? []);
  }, [
    congregation_id,
    is_groups_loading,
    is_canonical_loading,
    is_publishers_loading,
    canonical_groups,
    publishers_data,
  ]);

  if (is_groups_loading || is_canonical_loading || is_publishers_loading) {
    return <Spinner />;
  }

  const groups = (groups_data ?? []).filter(
    (g) => g.congregation_id === congregation_id,
  ) as ReorganisedGroup[];
  const publishers = (publishers_data ?? []) as Publisher[];
  const publisher_map = new Map(publishers.map((p) => [p.id, p]));

  const getGroupMemberCount = (group: ReorganisedGroup) => {
    return group.member_ids.filter((id) => {
      const p = publisher_map.get(id);
      return p && p.congregation_id === congregation_id && isListablePublisher(p, false);
    }).length;
  };

  const handle_reset = () => {
    void presentAlert({
      header: "Reset to Current Groups",
      message: "This will discard all changes and restore the current group list. Continue?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Reset",
          role: "confirm",
          handler: () => {
            if (!congregation_id) return;
            resetToCurrentGroups(congregation_id, canonical_groups ?? [], publishers);
          },
        },
      ],
    });
  };

  const handle_clear = () => {
    void presentAlert({
      header: "Clear All Groups",
      message:
        "This will remove all groups and group memberships from this temporary list. Continue?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Clear",
          role: "confirm",
          handler: () => {
            if (!congregation_id) return;
            clearAllGroups(congregation_id);
          },
        },
      ],
    });
  };

  return (
    <>
      {groups.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <Body color="medium">No groups found.</Body>
        </div>
      ) : (
        <IonList>
          <MultiColumnList
            items={groups}
            get_id={(g) => g.id}
            gap="sm"
            render_item={(g) => (
              <NavItem
                to={`/home/secretary/reorganise-groups/${g.id}`}
                label={g.name + " (" + getGroupMemberCount(g) + ")"}
              />
            )}
          />
        </IonList>
      )}

      <Space />

      <TextButton expand="block" on_click={handle_reset} label="Reset to Current Groups" />

      <TextButton expand="block" color="danger" on_click={handle_clear} label="Clear All Groups" />
    </>
  );
}
