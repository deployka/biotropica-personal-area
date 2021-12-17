import {
  FetchConsultationsDataActionInterface,
  SetConsultationsDataActionInterface,
  SetConsultationsLoadingStatusActionInterface,
  SetConsultationsResponseActionInterface,
  ConsultationsActionsType,
} from './contracts/actionTypes';
import { ConsultationsState } from './contracts/state';

export const fetchConsultationsData =
  (): FetchConsultationsDataActionInterface => ({
    type: ConsultationsActionsType.FETCH_CONSULTATIONS_DATA,
  });

export const setConsultationsLoadingStatus = (
  payload: ConsultationsState['status']
): SetConsultationsLoadingStatusActionInterface => ({
  type: ConsultationsActionsType.SET_LOADING_STATE,
  payload,
});

export const setConsultationsData = (
  payload: ConsultationsState['consultations']
): SetConsultationsDataActionInterface => ({
  type: ConsultationsActionsType.SET_CONSULTATIONS_DATA,
  payload,
});

export const setConsultationsResponse = (
  payload: ConsultationsState['response']
): SetConsultationsResponseActionInterface => ({
  type: ConsultationsActionsType.SET_CONSULTATIONS_RESPONSE,
  payload,
});

export type ConsultationsActions =
  | SetConsultationsDataActionInterface
  | SetConsultationsLoadingStatusActionInterface
  | SetConsultationsResponseActionInterface
  | SetConsultationsDataActionInterface;
