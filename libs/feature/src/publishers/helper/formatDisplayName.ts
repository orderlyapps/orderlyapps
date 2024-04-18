export const formatDisplayName = (publisher: {
  displayName: string;
  firstName: string;
  lastName: string;
}) => {
  if (!publisher) return;
  const displayName = publisher.displayName
    ? publisher.displayName
    : publisher.firstName;

  return `${publisher.lastName}, ${displayName}`;
};
