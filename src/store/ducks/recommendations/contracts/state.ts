import { LoadingStatus } from '../../../types';
import { Recommendation } from '../../recommendation/contracts/state';

export interface RecommendationsState {
  recommendations: Recommendation[] | [];
  status: LoadingStatus;
  response: any;
}
