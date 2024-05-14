import { endOfWeek, format } from 'date-fns';

export const formatDate = (date: Date) => {
  const eow = endOfWeek(date, { weekStartsOn: 1 });
  const start = format(date, 'MMM dd - ');
  const end = format(eow, `${eow.getDate() < 7 ? 'MMM ' : ''}dd`);
  return start + end;
};
