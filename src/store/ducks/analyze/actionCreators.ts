import {
  FetchAnalyzeDataActionInterface,
  setAnalyzeDataActionInterface,
  setAnalyzeLoadingStatusActionInterface,
  setAnalyzeResponseActionInterface,
  AnalyzeActionsType,
  CreateAnalyzeAnswerDataActionInterface,
  UpdateAnalyzeActionInterface,
  DeleteAnalyzeActionInterface,
} from './contracts/actionTypes';
import {
  CreateAnalyzeAnswerData,
  AnalyzeAnswerState,
  UpdateAnalyzeAnswerData,
} from './contracts/state';

export const fetchAnalyzeData = (
  payload: number
): FetchAnalyzeDataActionInterface => ({
  type: AnalyzeActionsType.FETCH_ANALYZE_DATA,
  payload,
});

export const createAnalyzeAnswerData = (
  payload: CreateAnalyzeAnswerData
): CreateAnalyzeAnswerDataActionInterface => ({
  type: AnalyzeActionsType.CREATE_ANALYZE_DATA,
  payload,
});

export const updateAnalyzeData = (
  payload: UpdateAnalyzeAnswerData
): UpdateAnalyzeActionInterface => ({
  type: AnalyzeActionsType.FETCH_UPDATE_ANALYZE,
  payload,
});

export const deleteAnalyzeData = (
  payload: number
): DeleteAnalyzeActionInterface => ({
  type: AnalyzeActionsType.FETCH_DELETE_ANALYZE,
  payload,
});

export const setAnalyzeLoadingStatus = (
  payload: AnalyzeAnswerState['status']
): setAnalyzeLoadingStatusActionInterface => ({
  type: AnalyzeActionsType.SET_LOADING_STATE,
  payload,
});

export const setAnalyzeData = (
  payload: AnalyzeAnswerState['analyze']
): setAnalyzeDataActionInterface => ({
  type: AnalyzeActionsType.SET_ANALYZE_DATA,
  payload,
});

export const setAnalyzeResponse = (
  payload: AnalyzeAnswerState['response']
): setAnalyzeResponseActionInterface => ({
  type: AnalyzeActionsType.SET_ANALYZE_RESPONSE,
  payload,
});

export type AnalyzeActions =
  | setAnalyzeDataActionInterface
  | setAnalyzeLoadingStatusActionInterface
  | setAnalyzeResponseActionInterface;
