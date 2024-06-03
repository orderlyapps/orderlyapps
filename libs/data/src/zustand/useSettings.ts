import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from './createSelectors';

const initialState: { [key: string]: any } = {};

export type SettingsState = {
  settings: typeof initialState;
};

type SettingsActions = {
  resetSettings: () => void;
  setSettings: (newSettings: typeof initialState) => void;
  setSettingsProperties: (newValues: { [property: string]: any }) => void;
};

const useSettingsBase = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      settings: initialState,

      resetSettings: () =>
        set(() => ({
          settings: initialState,
        })),

      setSettings: (newSettings: typeof initialState) => {
        set(() => ({
          settings: { ...newSettings },
        }));
      },

      setSettingsProperties:  (newValues: { [property: string]: any }) => {
        set((state: SettingsState) => ({
          settings: { ...state.settings, ...newValues },
        }));
      },
    }),
    {
      name: 'settings', // name of the item in the storage (must be unique)
    }
  )
);

export const useSettings = createSelectors(useSettingsBase);
