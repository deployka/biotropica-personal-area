import { RootState } from '../../store';
import { ConsultationsState } from './contracts/state';

export const selectConsultationsState = (
  state: RootState,
): ConsultationsState => state.consultations;

export const selectConsultationsData = (
  state: RootState,
): ConsultationsState['consultations'] =>
  selectConsultationsState(state)
    .consultations.slice()
    .sort((a, b) =>
      a.date && b.date ? +new Date(b.date) - +new Date(a.date) : -1,
    );

export const selectConsultationsResponse = (
  state: RootState,
): ConsultationsState['response'] => selectConsultationsState(state).response;

export const selectConsultationsStatus = (
  state: RootState,
): ConsultationsState['status'] => selectConsultationsState(state).status;

export const selectConsultationsLoadingStatus = (state: RootState): string =>
  selectConsultationsState(state).status;
