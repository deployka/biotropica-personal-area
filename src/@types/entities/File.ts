import { BaseEntity } from './BaseEntity';

export type File = BaseEntity & {
  name: string;
  originalName: string;
  size: number;
  type: string;
};
