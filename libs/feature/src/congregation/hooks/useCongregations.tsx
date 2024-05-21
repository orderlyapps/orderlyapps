import { createSelectors, supabase } from '@data';
import { eachWeekOfInterval, format, previousMonday } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialCongregationState: { [key: string]: any } = {};
const initialCongregationsState: any[] = [];

export type CongregationsState = {
  congregation: typeof initialCongregationState;
  congregations: typeof initialCongregationsState;
};

type CongregationsActions = {
  fetchCongregations: () => void;
  resetCongregation: () => void;
  setCongregation: (congregation_id: string) => void;
  upsertCongregation: (congregation_id: string) => void;
  updateCongregationProperties: (newValues: {
    [property: string]: any;
  }) => void;
};

const useCongregationsBase = create<
  CongregationsState & CongregationsActions
>()(
  persist(
    (set, get) => ({
      congregation: initialCongregationState,
      congregations: initialCongregationsState,
      fetchCongregations: async () => {
        try {
          let { data: congregations, error } = await supabase
            .from('congregations')
            .select('*')
            .order('name');
          if (error) throw error;
          if (!congregations) throw 'No congregation data found';
          set(() => ({
            congregations,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      resetCongregation: () => {
        set(() => ({
          congregation: initialCongregationState,
        }));
      },
      setCongregation: async (congregation_id: string) => {
        try {
          const { data: congregation, error } = await supabase
            .from('congregations')
            .select()
            .eq('id', congregation_id)
            .single();
          if (error) throw error;
          if (!congregation) throw 'No congregation data found';
          set(() => ({
            congregation,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      upsertCongregation: async (congregation_id: string) => {
        const congregation = get().congregation;

        const week_ids = eachWeekOfInterval(
          {
            start: previousMonday(congregation.start_date),
            end: congregation.end_date || congregation.start_date,
          },
          {
            weekStartsOn: 1,
          }
        ).map((id) => format(id, 'yyyy-MM-dd'));
      },
      updateCongregationProperties: (newValues: {
        [property: string]: any;
      }) => {
        set((state: CongregationsState) => ({
          congregation: { ...state.congregation, ...newValues },
        }));
      },
    }),
    {
      name: 'congregations',
    }
  )
);

export const useCongregations = createSelectors(useCongregationsBase);
