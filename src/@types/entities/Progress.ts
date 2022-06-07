import { BaseEntity } from './BaseEntity';

export type Progress = BaseEntity & {
  photos: ProgressPhoto[];
};

export type ProgressPhotoType = 'front' | 'back' | 'side';

export type ProgressPhoto = {
  type: ProgressPhotoType;
  filename: string;
};
