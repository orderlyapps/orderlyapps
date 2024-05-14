export const formatDisplayName = (
  publisher: {
    displayName: string;
    firstName: string;
    lastName: string;
  },
  format?: null | 'displayName lastName' | 'displayName'
) => {
  if (!publisher) return;
  const displayName = publisher.displayName
    ? publisher.displayName
    : publisher.firstName;

  if (format === 'displayName') {
    return displayName;
  }
  
  if (format === 'displayName lastName') {
    return `${displayName} ${publisher.lastName || ''}`;
  }

  return `${publisher.lastName || ''}, ${displayName || ''}`;
};

export default formatDisplayName;
