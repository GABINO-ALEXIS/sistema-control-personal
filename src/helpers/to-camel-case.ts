export const toCamelCase = (palabra: string): string => {
  const stringArray = palabra.split(' ');
  return stringArray
    .map((s) => {
      return `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}`;
    })
    .join(' ');
};
