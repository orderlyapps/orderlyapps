import { Database, createSelectors, supabase } from '@data';
import { eachWeekOfInterval, format, previousMonday } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialEventState = {} as Database['public']['Tables']['events']['Row'];
const initialEventsState =
  [] as Database['public']['Tables']['events']['Row'][];

export type EventsState = {
  event: typeof initialEventState;
  events: typeof initialEventsState;
};

type EventsActions = {
  fetchEvents: (congregation_id: string) => void;
  resetEvent: () => void;
  setEvent: (event_id: string) => void;
  upsertEvent: (congregation_id: string) => void;
  updateEventProperties: (newValues: { [property: string]: any }) => void;
};

const useEventsBase = create<EventsState & EventsActions>()(
  persist(
    (set, get) => ({
      event: initialEventState,
      events: initialEventsState,

      setEvent: async (event_id: string) => {
        try {
          const { data, error }: any = await supabase
            .from('events')
            .select('*')
            .eq('id', event_id)
            .single();
          if (error) throw error;
          if (!data) throw 'No event data found';
          set(() => ({
            event: data,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      resetEvent: () => {
        set(() => ({
          event: initialEventState,
        }));
      },

      fetchEvents: async (congregation_id: string) => {
        try {
          const { data, error }: any = await supabase
            .from('events')
            .select('*');
          // .eq('id', congregation_id);
          if (error) throw error;
          if (!data) throw 'No event data found';
          set(() => ({
            events: data,
          }));
        } catch (error) {
          console.log(error);
        }
      },

      upsertEvent: async (congregation_id: string) => {
        const event = get().event;
        const week_ids = eachWeekOfInterval(
          {
            start: previousMonday(event.start_date),
            end: event.end_date || event.start_date,
          },
          {
            weekStartsOn: 1,
          }
        ).map((id) => format(id, 'yyyy-MM-dd'));

        try {
          let { data, error } = await supabase.rpc('upsert_event', {
            event: {
              ...event,
              week_ids,
              congregation_id,
            },
          });

          if (error) throw error;
          if (!data) throw 'No event data found';

          set(() => ({
            events: data,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      updateEventProperties: (newValues: { [property: string]: any }) => {
        set((state: EventsState) => ({
          event: { ...state.event, ...newValues },
        }));
      },
    }),
    {
      name: 'events',
    }
  )
);

export const useEvents = createSelectors(useEventsBase);
