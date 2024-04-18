import { getMondays } from "./getMondays";

export const mondayOptions = getMondays().map((monday) => ({
  value: monday,
  text: new Date(monday).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
}));
