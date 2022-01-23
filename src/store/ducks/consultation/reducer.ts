import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { ConsultationActions } from './actionCreators';
import { ConsultationActionsType } from './contracts/actionTypes';
import { ConsultationState } from './contracts/state';

const initialConsultationState: ConsultationState = {
  consultation: undefined,
  closestConsultation: undefined,
  response: undefined,
  status: LoadingStatus.NEVER,
};

export const consultationReducer = produce(
  (draft: Draft<ConsultationState>, action: ConsultationActions) => {
    switch (action.type) {
      case ConsultationActionsType.SET_CONSULTATION_DATA:
        draft.consultation = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case ConsultationActionsType.SET_CLOSEST_CONSULTATION_DATA:
        draft.closestConsultation = action.payload;
        draft.status = LoadingStatus.SUCCESS;
        break;

      case ConsultationActionsType.SET_CONSULTATION_RESPONSE:
        draft.response = action.payload;
        break;

      case ConsultationActionsType.SET_LOADING_STATE:
        draft.status = action.payload;
        break;

      default:
        break;
    }
  },
  initialConsultationState,
);
