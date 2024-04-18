import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from '@data';

const initialState = {
  id: "",
  weSpeaker: '',
  weChairman: '',
  weReader: '',
  weTheme: 0,
};

export type ScheduleState = {
  schedule: typeof initialState;
};

type ScheduleActions = {
  resetSchedule: () => void;
  setSchedule: (newSchedule: typeof initialState) => void;
  setScheduleProperty: (property: string, value: any) => void;
};

const useScheduleBase = create<ScheduleState & ScheduleActions>()(
  persist(
    (set) => ({
      schedule: initialState,

      resetSchedule: () =>
        set(() => ({
          schedule: initialState,
        })),

      setSchedule: (newSchedule: typeof initialState) => {
        set(() => ({
          schedule: { ...newSchedule },
        }));
      },

      setScheduleProperty: (property: string, value: any) =>
        set((state: ScheduleState) => ({
          schedule: { ...state.schedule, [property]: value },
        })),
    }),
    {
      name: 'schedule', // name of the item in the storage (must be unique)
    }
  )
);

export const useSchedule = createSelectors(useScheduleBase);
