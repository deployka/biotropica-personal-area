import {
  FetchAnalyzesDataActionInterface,
  SetAnalyzesDataActionInterface,
  SetAnalyzesLoadingStatusActionInterface,
  SetAnalyzesResponseActionInterface,
  AnalyzesActionsType,
} from './contracts/actionTypes';
import { AnalyzesState } from './contracts/state';

export const fetchAnalyzesData = (
  id: number,
  offset?: number,
  limit?: number,
): FetchAnalyzesDataActionInterface => ({
  type: AnalyzesActionsType.FETCH_ANALYZES_DATA,
  payload: {
    id,
    offset,
    limit,
  },
});

export const setAnalyzesLoadingStatus = (
  payload: AnalyzesState['status'],
): SetAnalyzesLoadingStatusActionInterface => ({
  type: AnalyzesActionsType.SET_LOADING_STATE,
  payload,
});

export const setAnalyzesData = (
  payload: AnalyzesState['analyzes'],
): SetAnalyzesDataActionInterface => ({
  type: AnalyzesActionsType.SET_ANALYZES_DATA,
  payload,
});

export const setAnalyzesResponse = (
  payload: AnalyzesState['response'],
): SetAnalyzesResponseActionInterface => ({
  type: AnalyzesActionsType.SET_ANALYZES_RESPONSE,
  payload,
});

export type AnalyzesActions =
  | SetAnalyzesDataActionInterface
  | SetAnalyzesLoadingStatusActionInterface
  | SetAnalyzesResponseActionInterface
  | SetAnalyzesDataActionInterface;
