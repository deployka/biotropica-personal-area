import { LoadingStatus } from '../../../types';
import { Recommendation } from '../../recommendation/contracts/state';

export interface RecommendationsState {
  recommendations: Recommendation[] | undefined;
  status: LoadingStatus;
  response: any;
}
