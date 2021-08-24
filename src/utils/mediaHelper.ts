export function getMediaLink(filename: string) {
    return process.env.REACT_APP_BACKEND_URL + '/' + filename;
}
