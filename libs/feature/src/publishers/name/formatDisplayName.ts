export const formatDisplayName = (
  publisher: {
    display_name: string;
    first_name: string;
    last_name: string;
  },
  format?: null | 'display_name last_name' | 'display_name'
) => {
  if (!publisher) return;
  const display_name = publisher.display_name
    ? publisher.display_name
    : publisher.first_name;

  if (format === 'display_name') {
    return display_name;
  }
  
  if (format === 'display_name last_name') {
    return `${display_name} ${publisher.last_name || ''}`;
  }

  return `${publisher.last_name || ''}, ${display_name || ''}`;
};

export default formatDisplayName;
