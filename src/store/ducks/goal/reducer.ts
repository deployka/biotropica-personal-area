import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { GoalActions } from './actionCreators';
import { GoalActionsType } from './contracts/actionTypes';
import { GoalState } from './contracts/state';

const initialGoalState: GoalState = {
  goal: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const goalReducer = produce(
  (draft: Draft<GoalState>, action: GoalActions) => {
    switch (action.type) {
      case GoalActionsType.SET_GOAL_DATA:
        draft.goal = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case GoalActionsType.SET_GOAL_RESPONSE:
        draft.response = action.payload;
        break;

      case GoalActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialGoalState
);
