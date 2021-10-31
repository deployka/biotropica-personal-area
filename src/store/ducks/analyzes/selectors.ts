import { RootState } from '../../store';
import { AnalyzeState } from './contracts/state';

export const selectAnalyzeState = (state: RootState): AnalyzeState =>
  state.analyze;

export const selectAnalyzeData = (state: RootState): AnalyzeState['analyze'] =>
  selectAnalyzeState(state).analyze;

export const selectAnalyzeResponse = (
  state: RootState
): AnalyzeState['response'] => selectAnalyzeState(state).response;

export const selectAnalyzeStatus = (state: RootState): AnalyzeState['status'] =>
  selectAnalyzeState(state).status;

export const selectAnalyzeLoadingStatus = (state: RootState): string =>
  selectAnalyzeState(state).status;
