import { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { ToggleInput } from "@amodeo/proclaimer/ui/components/inputs/toggle/ToggleInput";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { format, parseISO } from "date-fns";
import { publisherCollection } from "../../../../../publisher/collections/publisher.ts";
import { getPublisherDisplayName } from "../../../../../publisher/utils/publisher-name.ts";
import { useSaveAuxiliaryPioneer } from "../../hooks/use-save-auxiliary-pioneer/use-save-auxiliary-pioneer.ts";

interface AuxiliaryPioneerModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  month: string;
  exclude_ids: string[];
}

export function AuxiliaryPioneerModal({
  is_open,
  on_dismiss,
  month,
  exclude_ids,
}: AuxiliaryPioneerModalProps) {
  const [publisher_id, set_publisher_id] = useState("");
  const [continuous, set_continuous] = useState(false);
  const [error, set_error] = useState<string | null>(null);
  const { save, is_loading } = useSaveAuxiliaryPioneer(month);

  const congregation_id = useStoredCongregation()?.id;
  const { data: publishers } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ p: publisherCollection })
            .where(({ p }) => eq(p.congregation_id, congregation_id))
        : undefined,
    [congregation_id],
  );

  const publisher_options = (publishers ?? [])
    .filter((p) => p.id && !p.archived_at && p.type === "publisher" && !exclude_ids.includes(p.id))
    .sort((a, b) => a.last_name.localeCompare(b.last_name))
    .map((p) => ({ value: p.id ?? "", label: getPublisherDisplayName(p, "last_first") }));

  const month_label = format(parseISO(`${month}-01T00:00:00`), "MMMM yyyy");

  const handle_save = () => {
    const publisher = (publishers ?? []).find((p) => p.id === publisher_id);
    if (!publisher) return;
    const result = save({
      publisher_id,
      group_id: publisher.group_id ?? null,
      continuous,
    });
    if (result) return set_error(result);
    on_dismiss();
  };

  return (
    <ResponsiveModal
      isOpen={is_open}
      onWillPresent={() => {
        set_publisher_id("");
        set_continuous(false);
        set_error(null);
      }}
      onDidDismiss={on_dismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Auxiliary Pioneer</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <Select
            label="Publisher"
            value={publisher_id || null}
            options={publisher_options}
            placeholder="Select publisher"
            on_change={(v) => typeof v === "string" && set_publisher_id(v)}
          />
          <ToggleInput
            label="Continuous Auxiliary"
            checked={continuous}
            on_change={set_continuous}
          />
          <IonItem lines="none">
            <Body color="medium" size="sm">
              {continuous
                ? "Applies every month going forward."
                : `For ${month_label} only — flags ${month_label}'s report.`}
            </Body>
          </IonItem>
          {error && (
            <IonItem lines="none">
              <Body color="danger" size="sm">
                {error}
              </Body>
            </IonItem>
          )}
          <Space />
          <SaveTextButton
            skip_confirmation
            disabled={!publisher_id || is_loading}
            on_click={handle_save}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
