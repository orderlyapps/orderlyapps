import { createSelectors, supabase } from '@data';
import { eachWeekOfInterval, format, previousMonday } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialEventState: { [key: string]: any } = {};
const initialEventsState: any[] = [];

export type EventsState = {
  event: typeof initialEventState;
  events: typeof initialEventsState;
};

type EventsActions = {
  fetchEvents: (rxdb: any, congregation_id: string) => void;
  resetEvent: () => void;
  setEvent: (congregation_id: string, event_id: string) => void;
  upsertEvent: (congregation_id: string) => void;
  updateEventProperties: (newValues: { [property: string]: any }) => void;
};

const useEventsBase = create<EventsState & EventsActions>()(
  persist(
    (set, get) => ({
      event: initialEventState,
      events: initialEventsState,

      setEvent: (congregation_id: string, event_id: string) => {
        const events = get().events;
        const newEvent = events.find(
          (event: any) => event.event_id === event_id
        );
        set(() => ({
          event: newEvent,
        }));
      },
      resetEvent: () => {
        set(() => ({
          event: initialEventState,
        }));
      },
      fetchEvents: async (congregation_id: string) => {
        const { data: cloudData, error }: any = await supabase
          .from('events')
          .select()
          .eq('congregation_id', congregation_id);
        if (error) {
          console.log(error.messsage);
        }

        try {
        } catch (error) {
          console.log(error);
          set(() => ({
            events: cloudData,
          }));
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
