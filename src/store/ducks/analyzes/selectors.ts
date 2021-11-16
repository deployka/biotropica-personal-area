import { RootState } from '../../store';
import { AnalyzesState } from './contracts/state';

export const selectAnalyzesState = (state: RootState): AnalyzesState =>
  state.analyzes;

export const selectAnalyzesData = (
  state: RootState
): AnalyzesState['analyzes'] => selectAnalyzesState(state).analyzes;

export const selectAnalyzesResponse = (
  state: RootState
): AnalyzesState['response'] => selectAnalyzesState(state).response;

export const selectAnalyzesStatus = (
  state: RootState
): AnalyzesState['status'] => selectAnalyzesState(state).status;

export const selectAnalyzesLoadingStatus = (state: RootState): string =>
  selectAnalyzesState(state).status;
