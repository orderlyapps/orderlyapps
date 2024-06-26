import { MinusSquareIcon } from 'lucide-react';
import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  RxDocument,
  RxCollection,
} from 'rxdb';

export const publishersSchemaLiteral = {
  title: 'publishers schema',
  description: 'Members of the congregation',
  version: 0,
  primaryKey: 'publisher_id',
  type: 'object',
  properties: {
    publisher_id: {
      type: 'string',
      maxLength: 100,
    },
    firstName: {
      type: 'string',
      maxLength: 100,
    },
    lastName: {
      type: 'string',
      maxLength: 100,
    },
    displayName: {
      type: 'string',
      maxLength: 100,
    },
    middleName: {
      type: 'string',
      maxLength: 100,
    },
    family_id: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    personalEmail: {
      type: 'string',
    },
    jwPubEmail: {
      type: 'string',
    },
    dateOfBirth: {
      type: 'string',
    },
    dateOfBaptism: {
      type: 'string',
    },
    dates: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        date: {
          type: 'string',
        },
      },
    },
    privileges: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    confidential_id: {
      type: 'string',
    },
    gender: {
      type: 'string',
      enum: ['male', 'female'],
    },
    standing: {
      type: 'string',
      enum: ['elder', 'servant', 'baptised', 'unbaptised', 'associate'],
    },
    edited: {
      type: 'number',
    },
    congregation_id: {
      type: 'string',
    },
    publisherType: {
      type: 'string',
      enum: [
        'pioneer',
        'infirmPioneer',
        'publisher',
        'associate',
        'inactive',
        'continuousAuxiliary',
        'specialFulltime',
        'emergencyContact',
      ],
    },
    group: {
      type: 'string',
    },
    unit: {
      type: 'string',
    },
    houseNumber: {
      type: 'string',
    },
    street: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
    },
    coordinates: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
        },
        longitude: {
          type: 'number',
        },
      },
    },
    hope: {
      type: 'string',
      enum: ['annointed', 'otherSheep', 'unknown'],
    },
    emergencyContacts: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['publisher_id'],
  indexes: [],
} as const; // <- It is important to set 'as const' to preserve the literal type

const schemaTyped = toTypedRxJsonSchema(publishersSchemaLiteral);

export type PublishersDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

export type PublishersDocMethods = {
  scream: (v: string) => string;
};

export type PublishersDocument = RxDocument<
  PublishersDocType,
  PublishersDocMethods
>;

// we declare one static ORM-method for the collection
export type PublishersCollectionMethods = {
  countAllDocuments: () => Promise<number>;
};

// and then merge all our types
export type PublishersCollection = RxCollection<
  PublishersDocType,
  PublishersDocMethods,
  PublishersCollectionMethods
>;

export type PublishersCollections = {
  publishers: PublishersCollection;
};

// create the typed RxJsonSchema from the literal typed object.
export const publishersSchema: RxJsonSchema<PublishersDocType> =
  publishersSchemaLiteral;

export const addPublisher = async (publisher: PublishersDocType) => {
  return publisher;
};

export const publishersDocMethods: PublishersDocMethods = {
  scream: function (this: PublishersDocument, what: string) {
    return this.publisher_id + ' screams: ' + what.toUpperCase();
  },
};

export const publishersCollectionMethods: PublishersCollectionMethods = {
  countAllDocuments: async function (this: PublishersCollection) {
    const allDocs = await this.find().exec();
    return allDocs.length;
  },
};
