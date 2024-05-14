import { useEvents } from '../hooks/useEvents';

const updateEventProperty = useEvents.use.updateEventProperty();

export const onInput = (e: any) =>
  updateEventProperty(e.target.name, e.target.value);
