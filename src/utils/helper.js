export const FormatFullName = (firstName, middleName, lastName) => {
  const nameParts = [firstName, middleName, lastName].filter(Boolean);
  return nameParts.join(' ');
};
