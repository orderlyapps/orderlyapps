import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { AlertMultiSelect } from "@amodeo/proclaimer/ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { localStorageKeyWithVariant } from "@amodeo/proclaimer/util/localStorageKeys";
import { useAccordionState } from "@amodeo/proclaimer/util/hooks/use-accordion-state";
import { mapTagCollection } from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { MapTagRow } from "@amodeo/proclaimer/feature/territory";
import { checkoutFilterLabels } from "../use-map-log-presets/types.ts";
import type {
  MapLogListSettings,
  MapLogListSortOrder,
} from "../use-map-log-settings/useMapLogSettings.ts";
import type { CheckoutFilter } from "../use-map-log-presets/types.ts";

const sortOptions: { label: string; value: MapLogListSortOrder }[] = [
  { label: "Alphabetical", value: "alphabetical" },
  { label: "Checked Out Date", value: "checked_out" },
];

const checkoutOptions = (Object.keys(checkoutFilterLabels) as CheckoutFilter[]).map((o) => ({
  value: o,
  label: checkoutFilterLabels[o],
}));

interface MapLogSettingsAccordionProps {
  settings: MapLogListSettings;
  on_change: (settings: MapLogListSettings) => void;
}

export function MapLogSettingsAccordion({ settings, on_change }: MapLogSettingsAccordionProps) {
  const { value, onIonChange } = useAccordionState(
    localStorageKeyWithVariant("mapLogListAccordion", "map_log"),
    undefined,
  );
  const { data: tags_data } = useLiveQuery((q) =>
    q.from({ t: mapTagCollection }).orderBy(({ t }) => t.name),
  );
  const congregation = useStoredCongregation();

  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const congregation_tags = all_tags.filter((t) => t.congregation_id === congregation?.id);
  const tag_options = congregation_tags.map((t) => ({ label: t.name, value: t.id ?? "" }));

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="settings">
        <IonItem slot="header">
          <IonLabel>
            <Heading>List Settings</Heading>
          </IonLabel>
        </IonItem>
        <div slot="content" className="ion-padding-bottom">
          <Select
            label="Checked Out"
            value={settings.checkout_filter}
            options={checkoutOptions}
            on_change={(v) => on_change({ ...settings, checkout_filter: v as CheckoutFilter })}
          />
          <Select
            label="Sort"
            value={settings.sort_order}
            options={sortOptions}
            on_change={(v) => on_change({ ...settings, sort_order: v as MapLogListSortOrder })}
          />
          <AlertMultiSelect
            label="Tags"
            options={tag_options}
            selected={settings.tag_ids}
            placeholder="Filter by tag..."
            on_change={(tag_ids) => on_change({ ...settings, tag_ids })}
          />
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
