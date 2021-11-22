export enum LoadingStatus {
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  NEVER = 'NEVER',
  SUCCESS = 'SUCCESS',
}

export interface Response {
  statusCode: number;
  message: string;
}
