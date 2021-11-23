export function getMediaLink(filename: string) {
  if (!filename) return '';
  return process.env.REACT_APP_BACKEND_URL + '/' + filename;
}
