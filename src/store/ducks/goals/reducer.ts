import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { GoalsActions } from './actionCreators';
import { GoalsActionsType } from './contracts/actionTypes';
import { GoalsState } from './contracts/state';

const initialGoalsState: GoalsState = {
  goals: [],
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const goalsReducer = produce(
  (draft: Draft<GoalsState>, action: GoalsActions) => {
    switch (action.type) {
      case GoalsActionsType.SET_GOALS_DATA:
        draft.goals = action.payload || [];
        draft.status = LoadingStatus.SUCCESS;
        break;

      case GoalsActionsType.SET_GOALS_RESPONSE:
        draft.response = action.payload;
        break;

      case GoalsActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialGoalsState
);
