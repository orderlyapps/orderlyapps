import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import {
  addRxPlugin,
  createRxDatabase,
  type RxCollection,
  type RxJsonSchema,
} from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import {
  publisherSchemaLiteral,
  type PublisherLocal,
} from "../../feature/publisher-local/schemas/publisher-local.js";
import { ministryTimeSchemaLiteral, type MinistryTimeLocal } from "./collections/ministry-time.js";
import { settingsSchemaLiteral, type SettingsLocal } from "./collections/settings.js";
import { returnVisitSchemaLiteral, type ReturnVisitLocal } from "./collections/return-visit.js";
import { watchtowerSchemaLiteral, type WatchtowerLocal } from "./collections/watchtower.js";
import {
  congregationBibleStudySchemaLiteral,
  type CongregationBibleStudyLocal,
} from "./collections/congregation-bible-study.js";

export interface ProclaimerRxCollections {
  publisher: RxCollection<PublisherLocal>;
  ministry_time: RxCollection<MinistryTimeLocal>;
  settings: RxCollection<SettingsLocal>;
  return_visit: RxCollection<ReturnVisitLocal>;
  watchtower: RxCollection<WatchtowerLocal>;
  congregation_bible_study: RxCollection<CongregationBibleStudyLocal>;
}

addRxPlugin(RxDBMigrationSchemaPlugin);
if (import.meta.env.DEV) addRxPlugin(RxDBDevModePlugin);

const storage = getRxStorageDexie();

export const rxdb = await createRxDatabase<ProclaimerRxCollections>({
  name: "mydatabase",
  storage: wrappedValidateAjvStorage({ storage }),
});

await rxdb.addCollections({
  publisher: {
    schema: publisherSchemaLiteral as RxJsonSchema<PublisherLocal>,
  },
  ministry_time: {
    schema: ministryTimeSchemaLiteral as RxJsonSchema<MinistryTimeLocal>,
    migrationStrategies: {
      1: (oldDoc) => ({
        ...oldDoc,
        ministry_type: oldDoc.ministry_type ?? "door_to_door",
      }),
    },
  },
  settings: {
    schema: settingsSchemaLiteral as RxJsonSchema<SettingsLocal>,
  },
  return_visit: {
    schema: returnVisitSchemaLiteral as RxJsonSchema<ReturnVisitLocal>,
    migrationStrategies: {
      1: (oldDoc) => ({
        ...oldDoc,
        first_name: oldDoc.first_name ?? "",
        last_name: oldDoc.last_name ?? "",
        phone_number: oldDoc.phone_number ?? "",
        notes: oldDoc.notes ?? "",
      }),
    },
  },
  watchtower: {
    schema: watchtowerSchemaLiteral as RxJsonSchema<WatchtowerLocal>,
  },
  congregation_bible_study: {
    schema: congregationBibleStudySchemaLiteral as RxJsonSchema<CongregationBibleStudyLocal>,
  },
});

if (import.meta.hot) {
  import.meta.hot.dispose(async () => {
    try {
      await rxdb.close();
    } catch {
      // Ignore cleanup errors during HMR disposal.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
}
