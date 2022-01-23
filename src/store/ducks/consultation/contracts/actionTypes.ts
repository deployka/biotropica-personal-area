import { Action } from 'redux';
import { LoadingStatus, Response } from '../../../types';
import { ClosestConsultation, Consultation, CreateConsultationData } from './state';

export enum ConsultationActionsType {
  SET_CONSULTATION_DATA = 'consultation/SET_CONSULTATION_DATA',
  SET_CONSULTATIONS_DATA = 'consultation/SET_CONSULTATIONS_DATA',
  SET_LOADING_STATE = 'consultation/SET_LOADING_STATE',
  SET_CONSULTATION_RESPONSE = 'consultation/SET_CONSULTATION_RESPONSE',
  FETCH_CONSULTATION_DATA = 'consultation/FETCH_CONSULTATION_DATA',
  CREATE_CONSULTATION_DATA = 'consultation/CREATE_CONSULTATION_DATA',
  FETCH_CONSULTATIONS_DATA = 'consultation/FETCH_CONSULTATIONS_DATA',
  FETCH_UPDATE_CONSULTATION = 'consultation/FETCH_UPDATE_CONSULTATION',
  FETCH_DELETE_CONSULTATION = 'consultation/FETCH_DELETE_CONSULTATION',
  FETCH_CLOSEST_CONSULTATION_DATA = 'consultation/FETCH_CLOSEST_CONSULTATION_DATA',
  SET_CLOSEST_CONSULTATION_DATA = 'consultation/SET_CLOSEST_CONSULTATION_DATA',
}

export interface FetchConsultationDataActionInterface
  extends Action<ConsultationActionsType> {
  type: ConsultationActionsType.FETCH_CONSULTATION_DATA;
  payload: number;
}
export interface FetchClosestConsultationDataActionInterface
  extends Action<ConsultationActionsType> {
  type: ConsultationActionsType.FETCH_CLOSEST_CONSULTATION_DATA;
}

export interface CreateConsultationDataActionInterface
  extends Action<ConsultationActionsType> {
  type: ConsultationActionsType.CREATE_CONSULTATION_DATA;
  payload: CreateConsultationData;
}

export interface SetConsultationResponseActionInterface
  extends Action<ConsultationActionsType> {
  type: ConsultationActionsType.SET_CONSULTATION_RESPONSE;
  payload: Response | undefined;
}

export interface SetConsultationDataActionInterface
  extends Action<ConsultationActionsType> {
  type: ConsultationActionsType.SET_CONSULTATION_DATA;
  payload: Consultation | undefined;
}

export interface SetClosestConsultationDataActionInterface
  extends Action<ConsultationActionsType> {
  type: ConsultationActionsType.SET_CLOSEST_CONSULTATION_DATA;
  payload: ClosestConsultation | undefined;
}

export interface SetConsultationLoadingStatusActionInterface
  extends Action<ConsultationActionsType> {
  type: ConsultationActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
