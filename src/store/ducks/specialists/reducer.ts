import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { SpecialistsActions } from './actionCreators';
import { SpecialistsActionsType } from './contracts/actionTypes';
import { SpecialistsState } from './contracts/state';

const initialSpecialistsState: SpecialistsState = {
  specialists: [],
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const specialistsReducer = produce(
  (draft: Draft<SpecialistsState>, action: SpecialistsActions) => {
    switch (action.type) {
      case SpecialistsActionsType.SET_SPECIALISTS_DATA:
        draft.specialists = action.payload || [];
        draft.status = LoadingStatus.SUCCESS;
        break;

      case SpecialistsActionsType.SET_SPECIALISTS_RESPONSE:
        draft.response = action.payload;
        break;

      case SpecialistsActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialSpecialistsState,
);
