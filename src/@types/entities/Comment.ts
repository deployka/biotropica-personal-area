import { BaseEntity } from './BaseEntity';
import { BaseUser } from './BaseUser';

export type Comment = BaseEntity & {
  uuid: string;
  text: string;
  datetime: string;
  author: Pick<BaseUser, 'profilePhoto' | 'name' | 'lastname' | 'id'>;
};
