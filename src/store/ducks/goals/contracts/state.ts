import { LoadingStatus } from '../../../types';
import { Goal } from '../../goal/contracts/state';

export interface GoalsState {
  goals: Goal[] | [];
  status: LoadingStatus;
  response: any;
}
