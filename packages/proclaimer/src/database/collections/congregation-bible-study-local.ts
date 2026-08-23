import type { CongregationBibleStudyLocal } from "../rxdb/collections/congregation-bible-study.js";
import { rxdb } from "../rxdb/database.js";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const congregationBibleStudyLocalCollection = createCollection(
  rxdbCollectionOptions<CongregationBibleStudyLocal>({
    rxCollection: rxdb.congregation_bible_study,
    startSync: true,
  }),
);
