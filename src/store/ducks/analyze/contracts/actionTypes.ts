import { Action } from 'redux';
import { LoadingStatus, Response } from '../../../types';
import {
  UpdateAnalyzeAnswerData,
  CreateAnalyzeAnswerData,
  AnalyzeAnswer,
} from './state';

export enum AnalyzeActionsType {
  SET_ANALYZE_DATA = 'analyze/SET_ANALYZE_DATA',
  SET_ANALYZES_DATA = 'analyze/SET_ANALYZES_DATA',
  SET_LOADING_STATE = 'analyze/SET_LOADING_STATE',
  SET_ANALYZE_RESPONSE = 'analyze/SET_ANALYZE_RESPONSE',
  FETCH_ANALYZE_DATA = 'analyze/FETCH_ANALYZE_DATA',
  CREATE_ANALYZE_DATA = 'analyzesCREATE_ANALYZE_DATA',
  FETCH_ANALYZES_DATA = 'analyze/FETCH_ANALYZES_DATA',
  FETCH_UPDATE_ANALYZE = 'analyze/FETCH_UPDATE_ANALYZE',
  FETCH_DELETE_ANALYZE = 'analyze/FETCH_DELETE_ANALYZE',
}

export interface UpdateAnalyzeActionInterface extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.FETCH_UPDATE_ANALYZE;
  payload: UpdateAnalyzeAnswerData;
}

export interface DeleteAnalyzeActionInterface extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.FETCH_DELETE_ANALYZE;
  payload: number;
}

export interface FetchAnalyzeDataActionInterface extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.FETCH_ANALYZE_DATA;
  payload: number;
}

export interface CreateAnalyzeAnswerDataActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.CREATE_ANALYZE_DATA;
  payload: CreateAnalyzeAnswerData;
}

export interface setAnalyzeResponseActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.SET_ANALYZE_RESPONSE;
  payload: Response | undefined;
}

export interface setAnalyzeDataActionInterface extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.SET_ANALYZE_DATA;
  payload: AnalyzeAnswer | undefined;
}

export interface setAnalyzeLoadingStatusActionInterface
  extends Action<AnalyzeActionsType> {
  type: AnalyzeActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
