import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { AnalyzeAnswer } from '../../analyze/contracts/state';

export enum AnalyzesActionsType {
  SET_ANALYZES_DATA = 'analyzes/SET_ANALYZES_DATA',
  SET_LOADING_STATE = 'analyzes/SET_LOADING_STATE',
  SET_ANALYZES_RESPONSE = 'analyzes/SET_ANALYZES_RESPONSE',
  FETCH_ANALYZES_DATA = 'analyzes/FETCH_ANALYZES_DATA',
}

interface Options {
  limit?: number;
  offset?: number;
}
export interface FetchAnalyzesDataActionInterface
  extends Action<AnalyzesActionsType> {
  type: AnalyzesActionsType.FETCH_ANALYZES_DATA;
  payload: Options;
}

export interface SetAnalyzesResponseActionInterface
  extends Action<AnalyzesActionsType> {
  type: AnalyzesActionsType.SET_ANALYZES_RESPONSE;
  payload: any;
}

export interface SetAnalyzesDataActionInterface
  extends Action<AnalyzesActionsType> {
  type: AnalyzesActionsType.SET_ANALYZES_DATA;
  payload: AnalyzeAnswer[] | [];
}

export interface SetAnalyzesLoadingStatusActionInterface
  extends Action<AnalyzesActionsType> {
  type: AnalyzesActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
