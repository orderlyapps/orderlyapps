export const formatAddress = (address: any) => {
  return `${
    address?.street ? `${address?.house_number} ${address?.street}, ` : ''
  }${address?.suburb ? address?.suburb : ''}`;
};
