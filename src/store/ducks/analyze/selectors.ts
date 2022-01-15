import { RootState } from '../../store';
import { AnalyzeAnswerState } from './contracts/state';

export const selectAnalyzeState = (state: RootState): AnalyzeAnswerState =>
  state.analyze;

export const selectAnalyzeData = (state: RootState): AnalyzeAnswerState['analyze'] =>
  selectAnalyzeState(state).analyze;

export const selectAnalyzeResponse = (
  state: RootState
): AnalyzeAnswerState['response'] => selectAnalyzeState(state).response;

export const selectAnalyzeStatus = (
  state: RootState
): AnalyzeAnswerState['status'] => selectAnalyzeState(state).status;

export const selectAnalyzeLoadingStatus = (state: RootState): string =>
  selectAnalyzeState(state).status;
