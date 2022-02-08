import { LoadingStatus, Response } from '../../../types';

export interface GoalsState {
  goals: Goal[] | [];
  status: LoadingStatus;
  response: Response | undefined;
}
