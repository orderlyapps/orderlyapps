import { createSelectors, supabase } from '@data';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState: { [key: string]: any } = { publisher: { outlines: [] } };

export type WeekState = {
  week: typeof initialState;
};

const selectValues =
  `*,` +
  `publicSpeaker:publicSpeaker_id (displayName, firstName, lastName),` +
  `watchtowerReader:watchtowerReader_id (displayName, firstName, lastName),` +
  `weekendChairman:weekendChairman_id (displayName, firstName, lastName)`;

type WeekActions = {
  resetWeek: () => void;
  setWeek: (newWeek: typeof initialState) => void;
  fetchWeek: (congregation_id: string, week_id: string) => void;
  setWeekProperties: (newValues: { [property: string]: any }) => void;
  setWeekProperty: (property: string, value: any) => void;
};

const useWeekBase = create<WeekState & WeekActions>()(
  persist(
    (set, get) => ({
      week: initialState,

      resetWeek: () =>
        set(() => ({
          week: initialState,
        })),

      setWeek: (newWeek: typeof initialState) => {
        set(() => ({
          week: { ...newWeek },
        }));
      },
      fetchWeek: async (congregation_id: string, week_id: string) => {
        try {
          const { data: weekData }: any = await supabase
            .from('schedule')
            .select(selectValues)
            .match({ week_id: week_id, congregation_id })
            .maybeSingle();

          if (!weekData) throw 'Not week data found';

          set(() => ({
            week: weekData,
          }));
        } catch (error: any) {
          if (error) console.log(error);
          set(() => ({
            week: { congregation_id, week_id },
          }));
        }
      },

      setWeekProperties: async (newValues: { [property: string]: any }) => {
        const oldWeek = get().week;
        try {
          const { data, error }: any = await supabase
            .from('schedule')
            .upsert({
              week_id: oldWeek.week_id,
              congregation_id: oldWeek.congregation_id,
              ...newValues,
            })
            .select(selectValues)
            .single();

          if (error) throw error.message;

          set(() => ({
            week: { ...data },
          }));
        } catch (error) {
          if (error) console.log(error);
          set(() => ({
            week: oldWeek,
          }));
        }
      },

      setWeekProperty: (property: string, value: any) => {
        set((state: WeekState) => ({
          week: { ...state.week, [property]: value },
        }));
      },
    }),
    {
      name: 'week', // name of the item in the storage (must be unique)
    }
  )
);

export const useWeek = createSelectors(useWeekBase);
