import {
  FetchAnalyzeDataActionInterface,
  SetAnalyzeDataActionInterface,
  SetAnalyzeLoadingStatusActionInterface,
  SetAnalyzeResponseActionInterface,
  AnalyzeActionsType,
  CreateAnalyzeDataActionInterface,
  UpdateAnalyzeActionInterface,
  DeleteAnalyzeActionInterface,
} from './contracts/actionTypes';
import {
  CreateAnalyzeData,
  AnalyzeState,
  UpdateAnalyzeData,
} from './contracts/state';

export const fetchAnalyzeData = (
  payload: number
): FetchAnalyzeDataActionInterface => ({
  type: AnalyzeActionsType.FETCH_ANALYZE_DATA,
  payload,
});

export const createAnalyzeData = (
  payload: CreateAnalyzeData
): CreateAnalyzeDataActionInterface => ({
  type: AnalyzeActionsType.CREATE_ANALYZE_DATA,
  payload,
});

export const updateAnalyzeData = (
  payload: UpdateAnalyzeData
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
  payload: AnalyzeState['status']
): SetAnalyzeLoadingStatusActionInterface => ({
  type: AnalyzeActionsType.SET_LOADING_STATE,
  payload,
});

export const setAnalyzeData = (
  payload: AnalyzeState['analyze']
): SetAnalyzeDataActionInterface => ({
  type: AnalyzeActionsType.SET_ANALYZE_DATA,
  payload,
});

export const setAnalyzeResponse = (
  payload: AnalyzeState['response']
): SetAnalyzeResponseActionInterface => ({
  type: AnalyzeActionsType.SET_ANALYZE_RESPONSE,
  payload,
});

export type AnalyzeActions =
  | SetAnalyzeDataActionInterface
  | SetAnalyzeLoadingStatusActionInterface
  | SetAnalyzeResponseActionInterface;
