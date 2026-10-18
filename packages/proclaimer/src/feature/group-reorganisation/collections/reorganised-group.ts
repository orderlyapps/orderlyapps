import { createCollection, localStorageCollectionOptions } from "@tanstack/react-db";
import { reorganisedGroupSchema } from "../schemas/reorganised-group.js";

export const reorganisedGroupCollection = createCollection(
  localStorageCollectionOptions({
    id: "reorganised-group",
    storageKey: "reorganised-groups",
    schema: reorganisedGroupSchema,
    getKey: (row) => row.id,
  }),
);
