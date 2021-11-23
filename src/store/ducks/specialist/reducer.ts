import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { SpecialistActions } from './actionCreators';
import { SpecialistActionsType } from './contracts/actionTypes';
import { SpecialistState } from './contracts/state';

const initialSpecialistState: SpecialistState = {
  specialist: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const specialistReducer = produce(
  (draft: Draft<SpecialistState>, action: SpecialistActions) => {
    switch (action.type) {
      case SpecialistActionsType.SET_SPECIALIST_DATA:
        draft.specialist = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case SpecialistActionsType.SET_SPECIALIST_RESPONSE:
        draft.response = action.payload;
        break;

      case SpecialistActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialSpecialistState
);
