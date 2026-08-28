import type { ReactNode } from "react";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { NumberInput } from "@amodeo/proclaimer/ui/components/inputs/number/NumberInput";
import { ToggleInput } from "@amodeo/proclaimer/ui/components/inputs/toggle/ToggleInput";
import { AlertMultiSelect } from "@amodeo/proclaimer/ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { checkoutFilterLabels } from "../../../use-map-log-presets/types";
import type { MapLogFilters, CheckoutFilter } from "../../../use-map-log-presets/types";

export interface MapLogFilterInputItem {
  id: string;
  node: ReactNode;
}

export function getMapLogFilterInputItems(
  filter: MapLogFilters,
  disabled: boolean,
  tag_options: { label: string; value: string }[],
  on_change: (filter: MapLogFilters) => void,
): MapLogFilterInputItem[] {
  const checkout_options = (Object.keys(checkoutFilterLabels) as CheckoutFilter[]).map((o) => ({
    value: o,
    label: checkoutFilterLabels[o],
  }));

  const items: MapLogFilterInputItem[] = [
    {
      id: "checkout_filter",
      node: (
        <Select
          label="Checked Out"
          value={filter.checkout_filter}
          options={checkout_options}
          disabled={disabled}
          on_change={(v) => on_change({ ...filter, checkout_filter: v as CheckoutFilter })}
        />
      ),
    },
    {
      id: "min_weeks_since_activity",
      node: (
        <NumberInput
          label="Min Weeks Since Activity"
          value={filter.min_weeks_since_activity?.toString() ?? ""}
          placeholder="Any"
          disabled={disabled}
          on_change={(v) =>
            on_change({
              ...filter,
              min_weeks_since_activity: v.trim() === "" ? null : Math.max(0, parseInt(v, 10) || 0),
            })
          }
        />
      ),
    },
    {
      id: "untagged_only",
      node: (
        <ToggleInput
          label="Untagged Only"
          checked={filter.untagged_only}
          disabled={disabled}
          on_change={(checked) =>
            on_change({
              ...filter,
              untagged_only: checked,
              tag_ids: checked ? [] : filter.tag_ids,
            })
          }
        />
      ),
    },
  ];

  if (!filter.untagged_only) {
    items.push({
      id: "tag_ids",
      node: (
        <AlertMultiSelect
          label="Tags"
          options={tag_options}
          selected={filter.tag_ids}
          placeholder="Filter by tag..."
          disabled={disabled}
          on_change={(tag_ids) => on_change({ ...filter, tag_ids })}
        />
      ),
    });
  }

  return items;
}
