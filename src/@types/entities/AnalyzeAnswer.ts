import { BaseEntity } from './BaseEntity';
import { Comment } from './Comment';

export type AnalyzeAnswer = BaseEntity & {
  analyzeId: UniqueId;
  text: string;
  filePath: string;
  comments: Comment[];
};
