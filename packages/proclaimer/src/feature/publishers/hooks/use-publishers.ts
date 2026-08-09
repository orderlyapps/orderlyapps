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
import type { PublisherRecord } from "../publisher-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getPublishersCollection } from "../publishers-collection/get-publishers-collection.js";
import type { PublishersCollection } from "../publishers-collection/create-publishers-collection.js";

export type PublisherRef = Ref<PublisherRecord>;
export type PublisherColumn = keyof PublisherRecord;

type WhereExpression = ReturnType<typeof eq>;

type NullOperator = "isNull" | "isNotNull";
type ComparisonOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
type PatternOperator = "like" | "ilike";
type ListOperator = "in";

/**
 * References another column as the right-hand side of a comparison, e.g.
 * `{ column: "id", op: "eq", value: { column: "family_id" } }`. Only columns
 * with a compatible type are allowed.
 */
export interface PublisherColumnRef<K extends PublisherColumn = PublisherColumn> {
  column: {
    [J in PublisherColumn]: NonNullable<PublisherRecord[J]> extends NonNullable<PublisherRecord[K]>
      ? J
      : never;
  }[PublisherColumn];
}

/**
 * A single column filter. The `value` type is inferred from `column`, e.g.
 * `{ column: "gender", op: "eq", value: "male" }`. Null operators take no
 * value; `in` takes an array of values; `like`/`ilike` take a string
 * pattern. Comparison operators also accept a `PublisherColumnRef` to
 * compare against another column.
 */
export type PublisherFilter = {
  [K in PublisherColumn]:
    | { column: K; op: NullOperator }
    | {
        column: K;
        op: ComparisonOperator;
        value: NonNullable<PublisherRecord[K]> | PublisherColumnRef<K>;
      }
    | { column: K; op: PatternOperator; value: string }
    | { column: K; op: ListOperator; value: Array<NonNullable<PublisherRecord[K]>> };
}[PublisherColumn];

/**
 * A group of filters combined with `and` or `or`. Groups can be nested to
 * build arbitrarily complex predicates.
 */
export type PublisherFilterGroup = { and: PublisherFilterNode[] } | { or: PublisherFilterNode[] };

export type PublisherFilterNode = PublisherFilter | PublisherFilterGroup;

export interface PublisherOrderBy {
  column: PublisherColumn;
  direction?: "asc" | "desc";
}

export interface UsePublishersOptions {
  /**
   * A filter, filter group, or array of nodes. An array is combined with
   * `and`. Nodes are plain serializable objects, so filter state can live in
   * component state, the URL, or localStorage.
   */
  filter?: PublisherFilterNode | PublisherFilterNode[];
  /**
   * Columns to sort by, in priority order. Each entry defaults to ascending.
   * When omitted or empty, publishers are sorted alphabetically by
   * `last_name`, then `display_name`, then `first_name`.
   */
  orderBy?: PublisherOrderBy[];
  /**
   * When `false`, no live query subscription is created and the result is
   * idle (`data: []`, `isLoading: false`). Defaults to `true`.
   */
  enabled?: boolean;
}

const DEFAULT_ORDER_BY: PublisherOrderBy[] = [
  { column: "last_name" },
  { column: "display_name" },
  { column: "first_name" },
];

export interface UsePublishersResult {
  data: PublisherRecord[];
  isLoading: boolean;
  isError: boolean;
  isConfigured: boolean;
}

function usePublishersBase(): {
  supabase: SupabaseClient | null;
  publishers: PublishersCollection | null;
} {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const publishers = supabase ? getPublishersCollection(supabase, queryClient) : null;
  return { supabase, publishers };
}

function buildPublishersResult(
  supabase: SupabaseClient | null,
  publishers: PublishersCollection | null,
  data: PublisherRecord[] | undefined,
  isLoading: boolean,
  isError: boolean,
): UsePublishersResult {
  const queryFailed = publishers?.utils.isError ?? false;
  return {
    data: data ?? [],
    isLoading: supabase ? isLoading : false,
    isError: supabase ? isError || queryFailed : false,
    isConfigured: supabase !== null,
  };
}

function isColumnRef(value: unknown): value is PublisherColumnRef {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "column" in value &&
    typeof value.column === "string"
  );
}

function buildColumnFilter(publisher: PublisherRef, node: PublisherFilter): WhereExpression {
  const ref = publisher[node.column];
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
      const operand = isColumnRef(node.value) ? publisher[node.value.column] : node.value;
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
  publisher: PublisherRef,
  nodes: PublisherFilterNode[],
  combine: typeof and,
): WhereExpression {
  const expressions = nodes.map((node) => buildNodeExpression(publisher, node));
  if (expressions.length === 1) return expressions[0];
  return combine(expressions[0], expressions[1], ...expressions.slice(2));
}

function buildNodeExpression(publisher: PublisherRef, node: PublisherFilterNode): WhereExpression {
  if ("column" in node) return buildColumnFilter(publisher, node);
  if ("and" in node) return combineNodes(publisher, node.and, and);
  if ("or" in node) return combineNodes(publisher, node.or, or);
  // Options arrive via JSON.parse, so malformed nodes can bypass the type
  // system (e.g. from URL state or localStorage)
  throw new Error(`Unknown filter node: ${JSON.stringify(node)}`);
}

/** Removes empty groups so a pruned tree always yields a real expression. */
function pruneNode(node: PublisherFilterNode): PublisherFilterNode | undefined {
  if ("column" in node) return node;
  const pruneChildren = (children: PublisherFilterNode[]) =>
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

function normalizeFilter(filter: UsePublishersOptions["filter"]): PublisherFilterNode[] {
  if (!filter) return [];
  const nodes = Array.isArray(filter) ? filter : [filter];
  return nodes.map(pruneNode).filter((node) => node !== undefined);
}

/**
 * Subscribes to a live view of the publishers collection.
 *
 * @param options.filter - Optional filter tree built from serializable
 *   column filters and `{ and }` / `{ or }` groups. A top-level array is
 *   combined with `and`. When omitted, all publishers are returned.
 * @param options.orderBy - Optional list of columns to sort by, applied in
 *   order. Each entry defaults to ascending. When omitted or empty, sorts
 *   alphabetically by last name, display name, then first name.
 * @param options.enabled - Set to `false` to skip creating a live query
 *   subscription; the result stays idle until re-enabled.
 *
 * Options are serialized for change detection, so callers can pass inline
 * object literals without memoizing them.
 */
export function usePublishers(options: UsePublishersOptions = {}): UsePublishersResult {
  const { supabase, publishers } = usePublishersBase();
  const optionsKey = JSON.stringify(options);

  const { data, isLoading, isError } = useLiveQuery(
    (q) => {
      if (!publishers) return null;
      const { filter, orderBy, enabled } = JSON.parse(optionsKey) as UsePublishersOptions;
      if (enabled === false) return null;
      const nodes = normalizeFilter(filter);

      let query = q.from({ publisher: publishers });
      if (nodes.length > 0) {
        query = query.where(({ publisher }) => combineNodes(publisher, nodes, and));
      }
      const sorts = orderBy && orderBy.length > 0 ? orderBy : DEFAULT_ORDER_BY;
      for (const { column, direction = "asc" } of sorts) {
        query = query.orderBy(({ publisher }) => publisher[column], direction);
      }
      return query;
    },
    [publishers, optionsKey],
  );

  return buildPublishersResult(supabase, publishers, data, isLoading, isError);
}
