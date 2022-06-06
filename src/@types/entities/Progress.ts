import { BaseEntity } from './BaseEntity';

export type Progress = BaseEntity & {
  photos: Photo[];
};

type Photo = {
  type: 'front' | 'back' | 'side';
  filename: string;
};
