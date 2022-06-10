import { BaseEntity } from './BaseEntity';
import { Client } from './Client';
import { Question } from './Question';

export type Answer = BaseEntity & {
  text: string;
  questionSessionHash: string;
  question: Question;
  userId: UniqueId;
  questionKey: string;
};
