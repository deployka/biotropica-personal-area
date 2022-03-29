
export function getWordCounterText(count: number, variations: string[]) {
  switch (count % 10) {
    case 1:
      if (count === 11) {
        return variations[0];
      }
      return variations[1];
    case 2:
    case 3:
    case 4:
      if (count === 12 || count === 13) {
        return variations[0];
      }
      return variations[2];
    default:
      return variations[0];
  }
}
