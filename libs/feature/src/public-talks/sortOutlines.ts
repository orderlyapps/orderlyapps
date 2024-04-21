export const sortOutlines = (a: string, b: string) => {
  const aNum = parseInt(a, 10);
  const bNum = parseInt(b, 10);
  if (isNaN(aNum) && isNaN(bNum)) {
    return a.localeCompare(b);
  }
  return aNum - bNum;
};
