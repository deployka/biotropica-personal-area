export const getCurrentPage = (pathname: string) =>
  pathname.split('/')[1] || '/';
