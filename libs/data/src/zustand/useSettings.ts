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
  setSettingsProperty: (property: string, value: any) => void;
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

      setSettingsProperty: (property: string, value: any) => {
        set((state: SettingsState) => ({
          settings: { ...state.settings, [property]: value },
        }));
      },
    }),
    {
      name: 'settings', // name of the item in the storage (must be unique)
    }
  )
);

export const useSettings = createSelectors(useSettingsBase);
