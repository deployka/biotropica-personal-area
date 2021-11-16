import { LoadingStatus } from '../../../types';
import { AnalyzeAnswer } from '../../analyze/contracts/state';

export interface AnalyzesState {
  analyzes: AnalyzeAnswer[] | [];
  status: LoadingStatus;
  response: any;
}
