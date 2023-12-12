export const parseLinkInText = (text: string, blank?: boolean) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url => {
    return `<a href="${url}" ${blank ? 'target="_blank"' : ''}>${url}</a>`;
  });
};
