export const formatDate = (date) => {
  const d = new Date(Date.parse(date));
  return `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
};
