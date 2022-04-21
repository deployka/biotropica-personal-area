export enum LoadingStatus {
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  NEVER = 'NEVER',
  SUCCESS = 'SUCCESS',
}

export type Response = {
  statusCode?: number;
  message?: string;
};
