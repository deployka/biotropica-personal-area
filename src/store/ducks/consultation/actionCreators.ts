import {
  FetchConsultationDataActionInterface,
  SetConsultationDataActionInterface,
  SetConsultationLoadingStatusActionInterface,
  SetConsultationResponseActionInterface,
  SetClosestConsultationDataActionInterface,
  ConsultationActionsType,
  CreateConsultationDataActionInterface,
  FetchClosestConsultationDataActionInterface,
} from './contracts/actionTypes';
import { CreateConsultationData, ConsultationState } from './contracts/state';

export const fetchConsultationData = (
  payload: number
): FetchConsultationDataActionInterface => ({
  type: ConsultationActionsType.FETCH_CONSULTATION_DATA,
  payload,
});

export const fetchClosestConsultationData =
  (): FetchClosestConsultationDataActionInterface => ({
    type: ConsultationActionsType.FETCH_CLOSEST_CONSULTATION_DATA,
  });

export const createConsultationData = (
  payload: CreateConsultationData
): CreateConsultationDataActionInterface => ({
  type: ConsultationActionsType.CREATE_CONSULTATION_DATA,
  payload,
});

export const setConsultationLoadingStatus = (
  payload: ConsultationState['status']
): SetConsultationLoadingStatusActionInterface => ({
  type: ConsultationActionsType.SET_LOADING_STATE,
  payload,
});

export const setConsultationData = (
  payload: ConsultationState['consultation']
): SetConsultationDataActionInterface => ({
  type: ConsultationActionsType.SET_CONSULTATION_DATA,
  payload,
});

export const setClosestConsultationData = (
  payload: ConsultationState['closestConsultation']
): SetClosestConsultationDataActionInterface => ({
  type: ConsultationActionsType.SET_CLOSEST_CONSULTATION_DATA,
  payload,
});

export const setConsultationResponse = (
  payload: ConsultationState['response']
): SetConsultationResponseActionInterface => ({
  type: ConsultationActionsType.SET_CONSULTATION_RESPONSE,
  payload,
});

export type ConsultationActions =
  | SetConsultationDataActionInterface
  | SetConsultationLoadingStatusActionInterface
  | SetConsultationResponseActionInterface
  | SetClosestConsultationDataActionInterface;
