import { LoadingStatus, Response } from '../../../types';

export interface Analyze {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface AnalyzeAnswer {
  id: number;
  analyzeId: number;
  text: string;
  filePath: string;
  createdAt: string;
}

export interface AnalyzeAnswerState {
  analyze: AnalyzeAnswer | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export type UpdateAnalyzeAnswerData = Partial<AnalyzeAnswer>;
export interface CreateAnalyzeAnswerData
  extends Omit<AnalyzeAnswer, 'id' | 'createdAt' | 'filePath'> {
  filePath: File | null | string;
}
