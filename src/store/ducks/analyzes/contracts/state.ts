import { LoadingStatus } from '../../../types';

export interface Analyze {
  id: number;
  createdAt: string;
}

export interface AnalyzeState {
  analyze: Analyze | undefined;
  status: LoadingStatus;
  response: any;
}

export enum AnalyzeType {
  FORCE = 'FORCE',
  WEIGHT = 'WEIGHT',
  RUN = 'RUN',
}

export interface UpdateAnalyzeData extends Partial<Analyze> {}
export interface CreateAnalyzeData extends Omit<Analyze, 'id' | 'createdAt'> {
  description: string;
}
