export const getFullName = (
  name: string,
  lastName: string,
  patronymic?: string,
): string => {
  let fullName = name.trim() + ' ' + lastName.trim();

  if (patronymic) {
    fullName = fullName + ' ' + patronymic.trim();
  }
  return fullName
    .split(' ')
    .map(w => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};
