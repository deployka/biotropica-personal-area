import { LoadingStatus, Response } from '../../../types';

export interface Progress {
  id: number;
  photos: Photo[];
  createdAt: Date;
}

export type Photo = {
  type: TypePhoto;
  filename: string;
};

// Миша должен брать тип фото отсюда
export enum TypePhoto {
  FRONT = 'FRONT',
  BACK = 'BACK',
  SIDE = 'SIDE',
}

export interface ProgressState {
  progress: Progress[] | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export enum ProgressType {}

export type UpdateProgressData = Partial<Progress>;
export interface CreateProgressData extends Omit<Progress, 'id' | 'createdAt'> {
  id?: number;
}
