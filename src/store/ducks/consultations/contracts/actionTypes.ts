import { Action } from 'redux';
import { LoadingStatus, Response } from '../../../types';
import { Consultation } from '../../consultation/contracts/state';

export enum ConsultationsActionsType {
  SET_CONSULTATIONS_DATA = 'consultations/SET_CONSULTATIONS_DATA',
  SET_LOADING_STATE = 'consultations/SET_LOADING_STATE',
  SET_CONSULTATIONS_RESPONSE = 'consultations/SET_CONSULTATIONS_RESPONSE',
  FETCH_CONSULTATIONS_DATA = 'consultations/FETCH_CONSULTATIONS_DATA',
}

export interface FetchConsultationsDataActionInterface
  extends Action<ConsultationsActionsType> {
  type: ConsultationsActionsType.FETCH_CONSULTATIONS_DATA;
}

export interface SetConsultationsResponseActionInterface
  extends Action<ConsultationsActionsType> {
  type: ConsultationsActionsType.SET_CONSULTATIONS_RESPONSE;
  payload: Response | undefined;
}

export interface SetConsultationsDataActionInterface
  extends Action<ConsultationsActionsType> {
  type: ConsultationsActionsType.SET_CONSULTATIONS_DATA;
  payload: Consultation[] | undefined;
}

export interface SetConsultationsLoadingStatusActionInterface
  extends Action<ConsultationsActionsType> {
  type: ConsultationsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
