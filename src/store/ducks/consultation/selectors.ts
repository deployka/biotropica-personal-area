import { RootState } from '../../store';
import { LoadingStatus } from '../../types';
import { ConsultationState } from './contracts/state';

export const selectConsultationState = (state: RootState): ConsultationState =>
  state.consultation;

export const selectConsultationData = (
  state: RootState,
): ConsultationState['consultation'] =>
  selectConsultationState(state).consultation;

export const selectClosestConsultationData = (
  state: RootState,
): ConsultationState['closestConsultation'] =>
  selectConsultationState(state).closestConsultation;

export const selectConsultationResponse = (
  state: RootState,
): ConsultationState['response'] => selectConsultationState(state).response;

export const selectConsultationStatus = (
  state: RootState,
): ConsultationState['status'] => selectConsultationState(state).status;

export const selectConsultationLoadingStatus = (
  state: RootState,
): LoadingStatus => selectConsultationState(state).status;
