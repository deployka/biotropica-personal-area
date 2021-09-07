import { LoadingStatus } from '../../../types';
import { Goal } from '../../goal/contracts/state';

export interface GoalsState {
  goals: Goal[] | undefined;
  status: LoadingStatus;
  response: any;
}
