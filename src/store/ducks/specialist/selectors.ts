import { RootState } from '../../store';

import { SpecialistState } from './contracts/state';

export const selectSpecialistState = (state: RootState): SpecialistState =>
  state.specialist;

export const selectSpecialistData = (
  state: RootState,
): SpecialistState['specialist'] => selectSpecialistState(state).specialist;

export const selectSpecialistResponse = (
  state: RootState,
): SpecialistState['response'] => selectSpecialistState(state).response;

export const selectIsAuth = (state: RootState): boolean =>
  !!window.localStorage.getItem('token');

export const selectSpecialistStatus = (
  state: RootState,
): SpecialistState['status'] => selectSpecialistState(state).status;

export const selectSpecialistLoadingStatus = (state: RootState): string =>
  selectSpecialistState(state).status;
