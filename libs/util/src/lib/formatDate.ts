export const formatDate = (date: number) => {
  return {
    theocraticScheduleWeek: `${
      new Date(date).getDate() < 8
        ? `${new Date(date).toLocaleString('default', {
            month: 'short',
          })} `
        : ''
    }${new Date(date).getDate()}`,

    theocraticWeek:
      `${new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} - ` +
      `${
        new Date(date + 518400000).getDate() < 7
          ? `${new Date(date + 518400000).toLocaleDateString('en-US', {
              month: 'short',
            })} `
          : ''
      }` +
      `${new Date(date + 518400000).getDate()}`,
  };
  date;
};
