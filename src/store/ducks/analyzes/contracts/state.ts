import { LoadingStatus, Response } from '../../../types';
import { AnalyzeAnswer } from '../../analyze/contracts/state';

export interface AnalyzesState {
  analyzes: AnalyzeAnswer[] | [];
  status: LoadingStatus;
  response: Response | undefined;
}
