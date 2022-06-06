import { BaseEntity } from './BaseEntity';

export type Progress = BaseEntity & {
  photos: ProgressPhoto[];
};

export type ProgressPhoto = {
  type: 'front' | 'back' | 'side';
  filename: string;
};
