import { Database, createSelectors, supabase } from '@data';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialPublisherState = {} as Database['public']['Tables']['publishers']['Row'];
const initialPublishersState =
  [] as Database['public']['Tables']['publishers']['Row'][];

export type PublishersState = {
  publisher: typeof initialPublisherState;
  publishers: typeof initialPublishersState;
};

type PublishersActions = {
  setPublishers: (rxdb: any, congregation_id: string) => void;
  resetPublisher: () => void;
  setPublisher: (publisher_id: string) => void;
  upsertPublisher: (rxdb: any, congregation_id: string) => void;
  updatePublisherProperty: (property: string, value: any) => void;
};

const usePublishersBase = create<PublishersState & PublishersActions>()(
  persist(
    (set, get) => ({
      publisher: initialPublisherState,
      publishers: initialPublishersState,

      setPublishers: async (rxdb: any, congregation_id: string) => {
        const { data: cloudData, error }: any = await supabase
          .from('publishers')
          .select()
          .eq('congregation_id', congregation_id);
        if (error) {
          console.log(error.messsage);
        }

        try {
          const localData = await rxdb.publishers
            ?.find()
            .where('congregation_id')
            .eq(congregation_id)
            .exec()
            .then((docs: any) => docs.map((doc: any) => doc.toJSON()));

          const mergedList = [...localData, ...cloudData].reduce(
            (acc, current) => {
              const existing = acc.find(
                (item: { publisher_id: any }) =>
                  item.publisher_id === current.publisher_id
              );
              return existing
                ? [
                    ...acc.filter(
                      (item: { publisher_id: any }) =>
                        item.publisher_id !== current.publisher_id
                    ),
                    { ...existing, ...current },
                  ]
                : [...acc, current];
            },
            [] as any[]
          );
          set(() => ({
            publishers: mergedList,
          }));
        } catch (error) {
          console.log(error);
          set(() => ({
            publishers: cloudData,
          }));
        }
      },
      resetPublisher: () => {
        set(() => ({
          publisher: initialPublisherState,
        }));
      },
      setPublisher: async (publisher_id: string) => {

try {
  const { data: congregation, error } = await supabase
  .from('congregations_data')
  .select()
  .eq('id', publisher_id)
  .single();
} catch (error) {
  
}
     



        const publishers = get().publishers;
        const newPublisher = publishers.find(
          (publisher: any) => publisher.publisher_id === publisher_id
        );
        set(() => ({
          publisher: newPublisher,
        }));
      },

      upsertPublisher: async (rxdb: any, congregation_id: string) => {
        const newPublisher = get().publisher;
        const id = crypto.randomUUID();

        try {
          const { data: cloudData, error } = await supabase
            .from('publishers')
            .upsert({
              ...newPublisher,
              id,
              congregation_id,
            })
            .select()
            .maybeSingle();

          if (!cloudData) throw 'Add publisher failed';

          let localData: any = await rxdb.publishers?.upsert({
            confidential_id: crypto.randomUUID(),
            ...newPublisher,
            ...cloudData,
          });

          if (!localData) localData = {};

          set((state: PublishersState) => ({
            publisher: { ...localData, ...cloudData },
            publishers: [...state.publishers, { ...localData, ...cloudData }],
          }));
        } catch (error) {
          if (error) console.log(error);
        }
      },

      updatePublisherProperty: (property: string, value: any) => {
        set((state: PublishersState) => ({
          publisher: { ...state.publisher, [property]: value },
        }));
      },
    }),
    {
      name: 'publishers', // name of the item in the storage (must be unique)
    }
  )
);

export const usePublishers = createSelectors(usePublishersBase);
