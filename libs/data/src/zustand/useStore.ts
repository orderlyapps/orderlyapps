import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from './createSelectors';

const initialState: { [key: string]: any } = { publisher: { outlines: [] } };

export type StoreState = {
  store: typeof initialState;
};

type StoreActions = {
  resetStore: () => void;
  setStore: (newStore: typeof initialState) => void;
  setStoreProperty: (property: string, value: any) => void;
};

const useStoreBase = create<StoreState & StoreActions>()(
  persist(
    (set) => ({
      store: initialState,

      resetStore: () =>
        set(() => ({
          store: initialState,
        })),

      setStore: (newStore: typeof initialState) => {
        set(() => ({
          store: { ...newStore },
        }));
      },

      setStoreProperty: (property: string, value: any) => {
        set((state: StoreState) => ({
          store: { ...state.store, [property]: value },
        }));
      },
    }),
    {
      name: 'store', // name of the item in the storage (must be unique)
    }
  )
);

export const useStore = createSelectors(useStoreBase);
