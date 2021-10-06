import { LoadingStatus } from '../../../types';

export interface Progress {
  id: number;
}

export interface ProgressState {
  progress: Progress | undefined;
  status: LoadingStatus;
  response: any;
}

export enum ProgressType {}

export interface UpdateProgressData extends Partial<Progress> {}
export interface CreateProgressData extends Omit<Progress, 'id'> {
  id?: number;
}
