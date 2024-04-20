import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from '@data';

const initialState = {
  name: '',
};

export type CongregationState = {
  congregation: typeof initialState;
};

type CongregationActions = {
  resetCongregation: () => void;
  setCongregation: (newCongregation: typeof initialState) => void;
  setCongregationProperty: (property: string, value: any) => void;
};

const useCongregationBase = create<CongregationState & CongregationActions>()(
  persist(
    (set) => ({
      congregation: initialState,

      resetCongregation: () =>
        set(() => ({
          congregation: initialState,
        })),

      setCongregation: (newCongregation: typeof initialState) => {
        set(() => ({
          congregation: { ...newCongregation },
        }));
      },

      setCongregationProperty: (property: string, value: any) =>
        set((state: CongregationState) => ({
          congregation: { ...state.congregation, [property]: value },
        })),
    }),
    {
      name: 'congregation', // name of the item in the storage (must be unique)
    }
  )
);

export const useCongregation = createSelectors(useCongregationBase);
