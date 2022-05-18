export const getFullName = (
  name: string,
  lastName: string,
  patronymic?: string,
): string => {
  let fullName = name + ' ' + lastName;
  if (patronymic) {
    fullName = fullName + ' ' + patronymic;
  }
  return fullName
    .split(' ')
    .map((w, i) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};
