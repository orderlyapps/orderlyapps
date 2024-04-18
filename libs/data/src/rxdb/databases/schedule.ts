import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  RxDocument,
  RxCollection,
} from 'rxdb';

export const scheduleSchemaLiteral = {
  title: 'schedule schema',
  description: 'Members of the congregation',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    weSpeaker: {
      type: 'string',
      maxLength: 100,
    },
    weTheme: {
      type: 'number',
      maxLength: 100,
    },
    weChairman: {
      type: 'string',
      maxLength: 100,
    },
    weReader: {
      type: 'string',
    },
  },
  required: ['id'],
  indexes: [],
} as const; // <- It is important to set 'as const' to preserve the literal type

const schemaTyped = toTypedRxJsonSchema(scheduleSchemaLiteral);

export type ScheduleDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export type ScheduleDocMethods = {
  scream: (v: string) => string;
};

export type ScheduleDocument = RxDocument<
  ScheduleDocType,
  ScheduleDocMethods
>;

// we declare one static ORM-method for the collection
export type ScheduleCollectionMethods = {
  countAllDocuments: () => Promise<number>;
};

// and then merge all our types
export type ScheduleCollection = RxCollection<
  ScheduleDocType,
  ScheduleDocMethods,
  ScheduleCollectionMethods
>;

export type ScheduleCollections = {
  schedule: ScheduleCollection;
};

// create the typed RxJsonSchema from the literal typed object.
export const scheduleSchema: RxJsonSchema<ScheduleDocType> =
  scheduleSchemaLiteral;

export const addPublisher = async (publisher: ScheduleDocType) => {
  return publisher;
};

export const scheduleDocMethods: ScheduleDocMethods = {
  scream: function (this: ScheduleDocument, what: string) {
    return this.weSpeaker + ' screams: ' + what.toUpperCase();
  },
};

export const scheduleCollectionMethods: ScheduleCollectionMethods = {
  countAllDocuments: async function (this: ScheduleCollection) {
    const allDocs = await this.find().exec();
    return allDocs.length;
  },
};
