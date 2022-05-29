import { RootState } from '../../store';
import { GoalsState } from './contracts/state';

export const selectGoalsState = (state: RootState): GoalsState => state.goals;

export const selectGoalsData = (state: RootState): GoalsState['goals'] => {
  const goals = selectGoalsState(state).goals.length
    ? selectGoalsState(state).goals
    : [];
  return goals
    .slice()
    .sort((a, b) => b.id - a.id)
    .filter(goal => !goal.completed);
};

export const selectGoalsResponse = (state: RootState): GoalsState['response'] =>
  selectGoalsState(state).response;

export const selectGoalsStatus = (state: RootState): GoalsState['status'] =>
  selectGoalsState(state).status;

export const selectGoalsLoadingStatus = (state: RootState): string =>
  selectGoalsState(state).status;
