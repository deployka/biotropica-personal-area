import { BaseEntity } from './BaseEntity';
import { BaseUser } from './BaseUser';

export type Comment = BaseEntity & {
  text: string;
  author: Pick<BaseUser, 'profilePhoto' | 'name' | 'lastname' | 'id'>;
};
