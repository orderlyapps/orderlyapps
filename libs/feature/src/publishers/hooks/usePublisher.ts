import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PublishersDocType, createSelectors } from '@data';

const initialState: PublishersDocType = {
  id: '',
  firstName: '',
  lastName: '',
  middleName: '',
  displayName: '',
  outlines: [],
  phoneNumber: '',
  personalEmail: '',
  jwPubEmail: '',
};

type PublisherState = {
  publisher: PublishersDocType;
};

type PublisherActions = {
  setPublisher: (publisher: PublishersDocType) => void;
  setPublisherProperty: (
    property: keyof PublishersDocType,
    value: string | string[]
  ) => void;
};

const usePublisherBase = create<PublisherState & PublisherActions>()(
  persist(
    (set) => ({
      publisher: initialState,

      setPublisher: (publisher: PublishersDocType) => {
        set(() => ({
          publisher: { ...publisher },
        }));
      },

      setPublisherProperty: (
        property: keyof PublishersDocType,
        value: string | string[]
      ) =>
        set((state: PublisherState) => ({
          publisher: { ...state.publisher, [property]: value },
        })),
    }),
    {
      name: 'publisher', // name of the item in the storage (must be unique)
    }
  )
);

export const usePublisher = createSelectors(usePublisherBase);
