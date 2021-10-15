export function compareDate(d1: Date, d2: Date): boolean {
  const d1s = `${d1.getDate()}.${d1.getMonth()}.${d1.getFullYear()}`;
  const d2s = `${d2.getDate()}.${d2.getMonth()}.${d2.getFullYear()}`;
  return d1s === d2s;
}
