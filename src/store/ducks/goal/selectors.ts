import { RootState } from '../../store';
import { GoalState } from './contracts/state';

export const selectGoalState = (state: RootState): GoalState => state.goal;

export const selectGoalData = (state: RootState): GoalState['goal'] =>
  selectGoalState(state).goal;

export const selectGoalResponse = (state: RootState): GoalState['response'] =>
  selectGoalState(state).response;

export const selectGoalStatus = (state: RootState): GoalState['status'] =>
  selectGoalState(state).status;

export const selectGoalLoadingStatus = (state: RootState): string =>
  selectGoalState(state).status;
