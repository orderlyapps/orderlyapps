import type { PublisherFilterNode } from "./hooks/use-publishers.js";

/**
 * A named, serializable filter preset. Presets map a friendly label to a
 * `PublisherFilterNode` (or array of nodes combined with `and`) so callers can
 * expose curated views — e.g. "Family Heads" — without coupling the UI to the
 * underlying column/ref filter shape.
 *
 * Presets are intentionally distinct from the `type` enum filter exposed by
 * `PublisherFilterSelect`; they describe derived concepts (family membership,
 * archival state, etc.) rather than a single column value.
 */
export interface PublisherFilterPreset {
  id: string;
  label: string;
  filter: PublisherFilterNode | PublisherFilterNode[];
}

/**
 * Built-in presets. `family_id` follows the self-reference convention:
 * a family head has `family_id = id`, a member has `family_id` pointing at
 * another publisher, and a publisher with no family has `family_id = null`.
 */
export const PUBLISHER_FILTER_PRESETS = [
  {
    id: "family_heads",
    label: "Family Heads",
    filter: { column: "id", op: "eq", value: { column: "family_id" } },
  },
  {
    id: "family_members",
    label: "Family Members",
    filter: {
      and: [
        { column: "family_id", op: "isNotNull" },
        { column: "family_id", op: "ne", value: { column: "id" } },
      ],
    },
  },
  {
    id: "no_family",
    label: "No Family",
    filter: { column: "family_id", op: "isNull" },
  },
] as const satisfies readonly PublisherFilterPreset[];

export type PublisherPresetId = (typeof PUBLISHER_FILTER_PRESETS)[number]["id"];

const PRESET_BY_ID: Map<string, PublisherFilterPreset> = new Map(
  PUBLISHER_FILTER_PRESETS.map((preset) => [preset.id, preset] as const),
);

/**
 * Looks up a built-in preset by id. Returns `undefined` for unknown ids so
 * callers can fall back to a default (e.g. "all"). Use `presetToFilter` to
 * resolve an id directly to a filter node.
 */
export function getPreset(id: string): PublisherFilterPreset | undefined {
  return PRESET_BY_ID.get(id);
}

/**
 * Resolves a preset id to its filter node(s), or `undefined` when the id is
 * unknown (treated as "no preset / show all"). Convenient for passing straight
 * to `usePublishers` / `PublisherList`.
 */
export function presetToFilter(
  id: string,
): PublisherFilterNode | PublisherFilterNode[] | undefined {
  return PRESET_BY_ID.get(id)?.filter;
}
