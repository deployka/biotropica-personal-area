import { RootState } from '../../store';
import { ProgressState } from './contracts/state';

export const selectProgressState = (state: RootState): ProgressState =>
  state.progress;

export const selectProgressData = (
  state: RootState,
): ProgressState['progress'] => selectProgressState(state).progress;

export const selectProgressResponse = (
  state: RootState,
): ProgressState['response'] => selectProgressState(state).response;

export const selectProgressStatus = (
  state: RootState,
): ProgressState['status'] => selectProgressState(state).status;

export const selectProgressLoadingStatus = (state: RootState): string =>
  selectProgressState(state).status;
