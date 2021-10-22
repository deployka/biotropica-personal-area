import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { UpdateAnalyzeData, Analyze, CreateAnalyzeData } from './state';

export enum AnalyzeActionsType {
  SET_ANALYZE_DATA = 'analyze/SET_ANALYZE_DATA',
  SET_ANALYZES_DATA = 'analyze/SET_ANALYZES_DATA',
  SET_LOADING_STATE = 'analyze/SET_LOADING_STATE',
  SET_ANALYZE_RESPONSE = 'analyze/SET_ANALYZE_RESPONSE',
  FETCH_ANALYZE_DATA = 'analyze/FETCH_ANALYZE_DATA',
  CREATE_ANALYZE_DATA = 'analyze/CREATE_ANALYZE_DATA',
  FETCH_ANALYZES_DATA = 'analyze/FETCH_ANALYZES_DATA',
  FETCH_UPDATE_ANALYZE = 'analyze/FETCH_UPDATE_ANALYZE',
  FETCH_DELETE_ANALYZE = 'analyze/FETCH_DELETE_ANALYZE',
}

export interface UpdateAnalyzeActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.FETCH_UPDATE_ANALYZE;
  payload: UpdateAnalyzeData;
}

export interface DeleteAnalyzeActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.FETCH_DELETE_ANALYZE;
  payload: number;
}

export interface FetchAnalyzeDataActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.FETCH_ANALYZE_DATA;
  payload: number;
}

export interface CreateAnalyzeDataActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.CREATE_ANALYZE_DATA;
  payload: CreateAnalyzeData;
}

export interface SetAnalyzeResponseActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.SET_ANALYZE_RESPONSE;
  payload: any;
}

export interface SetAnalyzeDataActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.SET_ANALYZE_DATA;
  payload: Analyze | undefined;
}

export interface SetAnalyzeLoadingStatusActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
