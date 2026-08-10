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
import type { PermissionRecord, PermissionType } from "../permission-schema.js";
import { useSupabaseOrNull } from "../../../providers/supabase-context.js";
import { getPermissionsCollection } from "../permissions-collection/get-permissions-collection.js";
import type { PermissionsCollection } from "../permissions-collection/create-permissions-collection.js";

export type PermissionRef = Ref<PermissionRecord>;
export type PermissionColumn = keyof PermissionRecord;

type WhereExpression = ReturnType<typeof eq>;

type NullOperator = "isNull" | "isNotNull";
type ComparisonOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
type PatternOperator = "like" | "ilike";
type ListOperator = "in";

/**
 * References another column as the right-hand side of a comparison, e.g.
 * `{ column: "auth_user_id", op: "eq", value: { column: "granted_by" } }`.
 * Only columns with a compatible type are allowed.
 */
export interface PermissionColumnRef<K extends PermissionColumn = PermissionColumn> {
  column: {
    [J in PermissionColumn]: NonNullable<PermissionRecord[J]> extends NonNullable<
      PermissionRecord[K]
    >
      ? J
      : never;
  }[PermissionColumn];
}

/**
 * A single column filter. The `value` type is inferred from `column`, e.g.
 * `{ column: "can_edit", op: "eq", value: true }`. Null operators take no
 * value; `in` takes an array of values; `like`/`ilike` take a string
 * pattern. Comparison operators also accept a `PermissionColumnRef` to
 * compare against another column.
 */
export type PermissionFilter = {
  [K in PermissionColumn]:
    | { column: K; op: NullOperator }
    | {
        column: K;
        op: ComparisonOperator;
        value: NonNullable<PermissionRecord[K]> | PermissionColumnRef<K>;
      }
    | { column: K; op: PatternOperator; value: string }
    | { column: K; op: ListOperator; value: Array<NonNullable<PermissionRecord[K]>> };
}[PermissionColumn];

/**
 * A group of filters combined with `and` or `or`. Groups can be nested to
 * build arbitrarily complex predicates.
 */
export type PermissionFilterGroup =
  | { and: PermissionFilterNode[] }
  | { or: PermissionFilterNode[] };

export type PermissionFilterNode = PermissionFilter | PermissionFilterGroup;

export interface PermissionOrderBy {
  column: PermissionColumn;
  direction?: "asc" | "desc";
}

export interface UsePermissionsOptions {
  /**
   * A filter, filter group, or array of nodes. An array is combined with
   * `and`. Nodes are plain serializable objects, so filter state can live in
   * component state, the URL, or localStorage.
   */
  filter?: PermissionFilterNode | PermissionFilterNode[];
  /**
   * Columns to sort by, in priority order. Each entry defaults to ascending.
   * When omitted or empty, permissions are sorted by `created_at` descending
   * (most recently granted first).
   */
  orderBy?: PermissionOrderBy[];
  /**
   * When `false`, no live query subscription is created and the result is
   * idle (`data: []`, `isLoading: false`). Defaults to `true`.
   */
  enabled?: boolean;
}

const DEFAULT_ORDER_BY: PermissionOrderBy[] = [{ column: "created_at", direction: "desc" }];

export interface UsePermissionsResult {
  data: PermissionRecord[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isConfigured: boolean;
}

function usePermissionsBase(type: PermissionType): {
  supabase: SupabaseClient | null;
  permissions: PermissionsCollection | null;
} {
  const supabase = useSupabaseOrNull();
  const queryClient = useQueryClient();
  const permissions = supabase ? getPermissionsCollection(supabase, queryClient, type) : null;
  return { supabase, permissions };
}

function buildPermissionsResult(
  supabase: SupabaseClient | null,
  permissions: PermissionsCollection | null,
  data: PermissionRecord[] | undefined,
  isLoading: boolean,
  isError: boolean,
): UsePermissionsResult {
  const queryFailed = permissions?.utils.isError ?? false;
  const hasError = supabase ? isError || queryFailed : false;
  // `lastError` resets on success but is not guaranteed to be in lockstep with
  // `isError`. When it's unavailable, return `null` so consumers fall back to
  // their own generic message via their `error ? describe(error) : fallback`
  // ternary.
  const error =
    hasError && permissions?.utils.lastError ? toError(permissions.utils.lastError) : null;
  return {
    data: data ?? [],
    isLoading: supabase ? isLoading : false,
    isError: hasError,
    error,
    isConfigured: supabase !== null,
  };
}

function isColumnRef(value: unknown): value is PermissionColumnRef {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "column" in value &&
    typeof value.column === "string"
  );
}

function buildColumnFilter(permission: PermissionRef, node: PermissionFilter): WhereExpression {
  const ref = permission[node.column];
  switch (node.op) {
    case "isNull":
      return isNull(ref);
    case "isNotNull":
      return not(isNull(ref));
    case "in":
      return inArray(ref, node.value);
    case "like":
      // `like`/`ilike` only apply to string columns (enforced by
      // `PatternOperator` in the filter type), but `ref` is a union of all
      // column refs including `can_edit` (boolean), so cast to the signature
      // `like` expects.
      return like(ref as Parameters<typeof like>[0], node.value);
    case "ilike":
      return ilike(ref as Parameters<typeof ilike>[0], node.value);
    default: {
      const operand = isColumnRef(node.value) ? permission[node.value.column] : node.value;
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
  permission: PermissionRef,
  nodes: PermissionFilterNode[],
  combine: typeof and,
): WhereExpression {
  const expressions = nodes.map((node) => buildNodeExpression(permission, node));
  if (expressions.length === 1) return expressions[0];
  return combine(expressions[0], expressions[1], ...expressions.slice(2));
}

function buildNodeExpression(
  permission: PermissionRef,
  node: PermissionFilterNode,
): WhereExpression {
  if ("column" in node) return buildColumnFilter(permission, node);
  if ("and" in node) return combineNodes(permission, node.and, and);
  if ("or" in node) return combineNodes(permission, node.or, or);
  // Options arrive via JSON.parse, so malformed nodes can bypass the type
  // system (e.g. from URL state or localStorage)
  throw new Error(`Unknown filter node: ${JSON.stringify(node)}`);
}

/** Removes empty groups so a pruned tree always yields a real expression. */
function pruneNode(node: PermissionFilterNode): PermissionFilterNode | undefined {
  if ("column" in node) return node;
  const pruneChildren = (children: PermissionFilterNode[]) =>
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

function normalizeFilter(filter: UsePermissionsOptions["filter"]): PermissionFilterNode[] {
  if (!filter) return [];
  const nodes = Array.isArray(filter) ? filter : [filter];
  return nodes.map(pruneNode).filter((node) => node !== undefined);
}

/**
 * Subscribes to a live view of the permissions collection for the given type.
 *
 * @param type - Which permission table to read, e.g. `"clean"` or `"speaker"`.
 * @param options.filter - Optional filter tree built from serializable
 *   column filters and `{ and }` / `{ or }` groups. A top-level array is
 *   combined with `and`. When omitted, all permissions of that type are
 *   returned.
 * @param options.orderBy - Optional list of columns to sort by, applied in
 *   order. Each entry defaults to ascending. When omitted or empty, sorts
 *   by `created_at` descending (most recently granted first).
 * @param options.enabled - Set to `false` to skip creating a live query
 *   subscription; the result stays idle until re-enabled.
 *
 * Options are serialized for change detection, so callers can pass inline
 * object literals without memoizing them.
 */
export function usePermissions(
  type: PermissionType,
  options: UsePermissionsOptions = {},
): UsePermissionsResult {
  const { supabase, permissions } = usePermissionsBase(type);
  const optionsKey = JSON.stringify(options);

  const { data, isLoading, isError } = useLiveQuery(
    (q) => {
      if (!permissions) return null;
      const { filter, orderBy, enabled } = JSON.parse(optionsKey) as UsePermissionsOptions;
      if (enabled === false) return null;
      const nodes = normalizeFilter(filter);

      let query = q.from({ permission: permissions });
      if (nodes.length > 0) {
        query = query.where(({ permission }) => combineNodes(permission, nodes, and));
      }
      const sorts = orderBy && orderBy.length > 0 ? orderBy : DEFAULT_ORDER_BY;
      for (const { column, direction = "asc" } of sorts) {
        query = query.orderBy(({ permission }) => permission[column], direction);
      }
      return query;
    },
    [permissions, optionsKey],
  );

  return buildPermissionsResult(supabase, permissions, data, isLoading, isError);
}
