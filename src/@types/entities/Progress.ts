import { BaseEntity } from './BaseEntity';

export type Progress = BaseEntity & {
  photos: ProgressPhoto[];
};

export enum ProgressPhotoType {
  BACK = 'back',
  FRONT = 'front',
  SIDE = 'side',
}

export type ProgressPhoto = {
  type: ProgressPhotoType;
  filename: string;
};
