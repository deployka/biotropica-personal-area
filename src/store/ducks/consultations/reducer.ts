import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { ConsultationsActions } from './actionCreators';
import { ConsultationsActionsType } from './contracts/actionTypes';
import { ConsultationsState } from './contracts/state';

const initialConsultationsState: ConsultationsState = {
  consultations: [],
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const consultationsReducer = produce(
  (draft: Draft<ConsultationsState>, action: ConsultationsActions) => {
    switch (action.type) {
      case ConsultationsActionsType.SET_CONSULTATIONS_DATA:
        draft.consultations = action.payload || [];
        draft.status = LoadingStatus.SUCCESS;
        break;

      case ConsultationsActionsType.SET_CONSULTATIONS_RESPONSE:
        draft.response = action.payload;
        break;

      case ConsultationsActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialConsultationsState,
);
