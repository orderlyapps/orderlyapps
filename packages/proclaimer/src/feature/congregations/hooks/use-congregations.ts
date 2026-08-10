import {
  and,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  isNull,
  like,
  lt,
  lte,
  not,
  or,
  useLiveQuery,
} from "@tanstack/react-db";
import type { Ref } from "@tanstack/react-db";
import { useQueryClient } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";
import { toError } from "@amodeo/utils";
import type { CongregationRecord } from "../congregation-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getCongregationsCollection } from "../congregations-collection/get-congregations-collection.js";
import { useCongregationId } from "../congregations-collection/congregation-id-context.js";
import type { CongregationsCollection } from "../congregations-collection/create-congregations-collection.js";

export type CongregationRef = Ref<CongregationRecord>;
export type CongregationColumn = keyof CongregationRecord;

type WhereExpression = ReturnType<typeof eq>;

type NullOperator = "isNull" | "isNotNull";
type ComparisonOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
type PatternOperator = "like" | "ilike";
type ListOperator = "in";

/**
 * References another column as the right-hand side of a comparison, e.g.
 * `{ column: "id", op: "eq", value: { column: "congregation_id" } }`. Only
 * columns with a compatible type are allowed.
 */
export interface CongregationColumnRef<K extends CongregationColumn = CongregationColumn> {
  column: {
    [J in CongregationColumn]: NonNullable<CongregationRecord[J]> extends NonNullable<
      CongregationRecord[K]
    >
      ? J
      : never;
  }[CongregationColumn];
}

/**
 * A single column filter. The `value` type is inferred from `column`, e.g.
 * `{ column: "name", op: "ilike", value: "%South%" }`. Null operators take no
 * value; `in` takes an array of values; `like`/`ilike` take a string
 * pattern. Comparison operators also accept a `CongregationColumnRef` to
 * compare against another column.
 */
export type CongregationFilter = {
  [K in CongregationColumn]:
    | { column: K; op: NullOperator }
    | {
        column: K;
        op: ComparisonOperator;
        value: NonNullable<CongregationRecord[K]> | CongregationColumnRef<K>;
      }
    | { column: K; op: PatternOperator; value: string }
    | { column: K; op: ListOperator; value: Array<NonNullable<CongregationRecord[K]>> };
}[CongregationColumn];

/**
 * A group of filters combined with `and` or `or`. Groups can be nested to
 * build arbitrarily complex predicates.
 */
export type CongregationFilterGroup =
  | { and: CongregationFilterNode[] }
  | { or: CongregationFilterNode[] };

export type CongregationFilterNode = CongregationFilter | CongregationFilterGroup;

export interface CongregationOrderBy {
  column: CongregationColumn;
  direction?: "asc" | "desc";
}

export interface UseCongregationsOptions {
  /**
   * A filter, filter group, or array of nodes. An array is combined with
   * `and`. Nodes are plain serializable objects, so filter state can live in
   * component state, the URL, or localStorage.
   */
  filter?: CongregationFilterNode | CongregationFilterNode[];
  /**
   * Columns to sort by, in priority order. Each entry defaults to ascending.
   * When omitted or empty, congregations are sorted alphabetically by `name`.
   */
  orderBy?: CongregationOrderBy[];
  /**
   * When `false`, no live query subscription is created and the result is
   * idle (`data: []`, `isLoading: false`). Defaults to `true`.
   */
  enabled?: boolean;
}

const DEFAULT_ORDER_BY: CongregationOrderBy[] = [{ column: "name" }];

export interface UseCongregationsResult {
  data: CongregationRecord[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isConfigured: boolean;
}

function useCongregationsBase(): {
  supabase: SupabaseClient | null;
  congregations: CongregationsCollection | null;
} {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const congregationId = useCongregationId();
  const congregations = supabase
    ? getCongregationsCollection(supabase, queryClient, congregationId)
    : null;
  return { supabase, congregations };
}

function buildCongregationsResult(
  supabase: SupabaseClient | null,
  congregations: CongregationsCollection | null,
  data: CongregationRecord[] | undefined,
  isLoading: boolean,
  isError: boolean,
): UseCongregationsResult {
  const queryFailed = congregations?.utils.isError ?? false;
  const hasError = supabase ? isError || queryFailed : false;
  // `lastError` resets on success but is not guaranteed to be in lockstep with
  // `isError`. When it's unavailable, return `null` so consumers fall back to
  // their own generic message via their `error ? describe(error) : fallback`
  // ternary.
  const error =
    hasError && congregations?.utils.lastError ? toError(congregations.utils.lastError) : null;
  return {
    data: data ?? [],
    isLoading: supabase ? isLoading : false,
    isError: hasError,
    error,
    isConfigured: supabase !== null,
  };
}

function isColumnRef(value: unknown): value is CongregationColumnRef {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "column" in value &&
    typeof value.column === "string"
  );
}

function buildColumnFilter(
  congregation: CongregationRef,
  node: CongregationFilter,
): WhereExpression {
  const ref = congregation[node.column];
  switch (node.op) {
    case "isNull":
      return isNull(ref);
    case "isNotNull":
      return not(isNull(ref));
    case "in":
      return inArray(ref, node.value);
    case "like":
      return like(ref, node.value);
    case "ilike":
      return ilike(ref, node.value);
    default: {
      const operand = isColumnRef(node.value) ? congregation[node.value.column] : node.value;
      switch (node.op) {
        case "ne":
          return not(eq(ref, operand));
        case "eq":
          return eq(ref, operand);
        case "gt":
          return gt(ref, operand);
        case "gte":
          return gte(ref, operand);
        case "lt":
          return lt(ref, operand);
        case "lte":
          return lte(ref, operand);
        default:
          // Options arrive via JSON.parse, so an unknown op can bypass the
          // type system (e.g. from URL state or localStorage)
          throw new Error(`Unknown filter operator: ${(node as { op: string }).op}`);
      }
    }
  }
}

function combineNodes(
  congregation: CongregationRef,
  nodes: CongregationFilterNode[],
  combine: typeof and,
): WhereExpression {
  const expressions = nodes.map((node) => buildNodeExpression(congregation, node));
  if (expressions.length === 1) return expressions[0];
  return combine(expressions[0], expressions[1], ...expressions.slice(2));
}

function buildNodeExpression(
  congregation: CongregationRef,
  node: CongregationFilterNode,
): WhereExpression {
  if ("column" in node) return buildColumnFilter(congregation, node);
  if ("and" in node) return combineNodes(congregation, node.and, and);
  if ("or" in node) return combineNodes(congregation, node.or, or);
  // Options arrive via JSON.parse, so malformed nodes can bypass the type
  // system (e.g. from URL state or localStorage)
  throw new Error(`Unknown filter node: ${JSON.stringify(node)}`);
}

/** Removes empty groups so a pruned tree always yields a real expression. */
function pruneNode(node: CongregationFilterNode): CongregationFilterNode | undefined {
  if ("column" in node) return node;
  const pruneChildren = (children: CongregationFilterNode[]) =>
    children.map(pruneNode).filter((child) => child !== undefined);
  if ("and" in node) {
    const children = pruneChildren(node.and);
    return children.length > 0 ? { and: children } : undefined;
  }
  if ("or" in node) {
    const children = pruneChildren(node.or);
    return children.length > 0 ? { or: children } : undefined;
  }
  throw new Error(`Unknown filter node: ${JSON.stringify(node)}`);
}

function normalizeFilter(filter: UseCongregationsOptions["filter"]): CongregationFilterNode[] {
  if (!filter) return [];
  const nodes = Array.isArray(filter) ? filter : [filter];
  return nodes.map(pruneNode).filter((node) => node !== undefined);
}

/**
 * Subscribes to a live view of the congregations collection.
 *
 * @param options.filter - Optional filter tree built from serializable
 *   column filters and `{ and }` / `{ or }` groups. A top-level array is
 *   combined with `and`. When omitted, all congregations are returned.
 * @param options.orderBy - Optional list of columns to sort by, applied in
 *   order. Each entry defaults to ascending. When omitted or empty, sorts
 *   alphabetically by name.
 * @param options.enabled - Set to `false` to skip creating a live query
 *   subscription; the result stays idle until re-enabled.
 *
 * Options are serialized for change detection, so callers can pass inline
 * object literals without memoizing them.
 */
export function useCongregations(options: UseCongregationsOptions = {}): UseCongregationsResult {
  const { supabase, congregations } = useCongregationsBase();
  const optionsKey = JSON.stringify(options);

  const { data, isLoading, isError } = useLiveQuery(
    (q) => {
      if (!congregations) return null;
      const { filter, orderBy, enabled } = JSON.parse(optionsKey) as UseCongregationsOptions;
      if (enabled === false) return null;
      const nodes = normalizeFilter(filter);

      let query = q.from({ congregation: congregations });
      if (nodes.length > 0) {
        query = query.where(({ congregation }) => combineNodes(congregation, nodes, and));
      }
      const sorts = orderBy && orderBy.length > 0 ? orderBy : DEFAULT_ORDER_BY;
      for (const { column, direction = "asc" } of sorts) {
        query = query.orderBy(({ congregation }) => congregation[column], direction);
      }
      return query;
    },
    [congregations, optionsKey],
  );

  return buildCongregationsResult(supabase, congregations, data, isLoading, isError);
}
