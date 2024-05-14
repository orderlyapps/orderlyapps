import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from './createSelectors';
import { initOrderlyDB } from '../rxdb/databases/orderlyDB';

const initialState: any = null;

export type RXdbState = {
  rxdb: typeof initialState;
};

type RXdbActions = {
  resetRXdb: () => void;
  setRXdb: (newRXdb: typeof initialState) => void;
  initRXorderlyDB: () => void;
  setRXdbProperty: (property: string, value: any) => void;
};

const useRXdbBase = create<RXdbState & RXdbActions>()((set) => ({
  rxdb: initialState,

  resetRXdb: () =>
    set(() => ({
      rxdb: initialState,
    })),

  setRXdb: (newRXdb: typeof initialState) => {
    set(() => ({
      rxdb: newRXdb,
    }));
  },
  initRXorderlyDB: async () => {
    const rxdb = await initOrderlyDB();
    set(() => ({
      rxdb: rxdb,
    }));
  },

  setRXdbProperty: (property: string, value: any) => {
    set((state: RXdbState) => ({
      rxdb: { ...state.rxdb, [property]: value },
    }));
  },
}));

export const useRXdb = createSelectors(useRXdbBase);
