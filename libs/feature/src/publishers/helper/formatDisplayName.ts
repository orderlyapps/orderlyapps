export const formatDisplayName = (
  publisher: {
    displayName: string;
    firstName: string;
    lastName: string;
  },
  format?: null | 'displayName lastName'
) => {
  if (!publisher) return;
  const displayName = publisher.displayName
    ? publisher.displayName
    : publisher.firstName;

  if (format === 'displayName lastName') {
    return `${displayName } ${publisher.lastName || ''}`;
  }
  return `${publisher.lastName || ''}, ${displayName || ''}`;
};

export default formatDisplayName;