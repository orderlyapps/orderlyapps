import { create } from 'zustand';
import { createSelectors } from '@data';
import { Session } from '@supabase/supabase-js';

const initialState = null as Session | null;

export type ScheduleState = {
  session: typeof initialState;
};

type ScheduleActions = {
  setSBAuth: (newSchedule: typeof initialState) => void;
};

const useSBAuthBase = create<ScheduleState & ScheduleActions>((set) => ({
  session: initialState,

  setSBAuth: (session: typeof initialState) => {
    set(() => ({
      session,
    }));
  },
}));

export const useSBAuth = createSelectors(useSBAuthBase);
