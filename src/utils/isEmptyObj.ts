export function isEmptyObj(obj: any): boolean {
  for (let _ in obj) {
    return false;
  }
  return true;
}
