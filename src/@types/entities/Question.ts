import { BaseEntity } from './BaseEntity';

type QuestionType = 'text' | 'number' | 'select' | 'multiselect';

type QuestionCondition = {
  compareType: 'eq' | 'ne' | 'gt' | 'lt' | 'ge' | 'le';
  questionKey: string;
  expectedValue: string;
};

export type Question = BaseEntity & {
  key: string;
  title: string;
  description: string;
  order: number;
  condition: QuestionCondition;
  allowedAnswers: string[];
  extended: boolean;
  type: QuestionType;
};

export type CurrentQuestion = {
  question?: Question;
  status: 'inProgress' | 'finished';
  index: number;
  total: number;
};
