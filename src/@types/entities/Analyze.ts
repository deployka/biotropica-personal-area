import { BaseEntity } from './BaseEntity';

export type Analyze = BaseEntity & {
  title: string;
  description: string;
};
