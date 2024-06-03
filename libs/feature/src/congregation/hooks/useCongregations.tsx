import { Database, createSelectors, supabase } from '@data';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialCongregationState = {
  id: null,
  admins: null,
  weekend_meeting_editors: null,
} as Database['public']['Views']['congregations_data']['Row'];
const initialCongregationsState =
  [] as Database['public']['Views']['congregations_data']['Row'][];

export type CongregationsState = {
  congregation: typeof initialCongregationState;
  congregations: typeof initialCongregationsState;
};

type CongregationsActions = {
  fetchCongregations: () => void;
  claimCongregation: (congregation_id: string) => void;
  yieldCongregation: (congregation_id: string) => void;
  resetCongregation: () => void;
  setCongregation: (congregation_id: string) => void;
  upsertCongregation: () => void;
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
            .from('congregations_data')
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
      claimCongregation: async (congregation_id: string) => {
        try {
          let { data: congregations, error } = await supabase.rpc(
            'claim_congregation',
            {
              congregation_id,
            }
          );

          if (error) throw error;
          if (!congregations) throw 'No congregation data found';

          set(() => ({
            congregations,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      yieldCongregation: async (congregation_id: string) => {
        try {
          let { data: congregations, error } = await supabase.rpc(
            'yield_congregation',
            {
              congregation_id,
            }
          );

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
            .from('congregations_data')
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
      upsertCongregation: async () => {
        const congregation = get()
          .congregation as Database['public']['Tables']['congregations']['Row'];

        try {
          let { data: congregations, error } = await supabase.rpc(
            'upsert_congregation',
            congregation
          );
          if (error) throw error;
          if (!congregations) throw 'No congregation data found';
          set(() => ({
            congregations,
          }));
        } catch (error) {
          if (error) console.error(error);
        }
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
