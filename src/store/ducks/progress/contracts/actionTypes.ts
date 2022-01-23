import { Action } from 'redux';
import { LoadingStatus, Response } from '../../../types';
import { UpdateProgressData, Progress, CreateProgressData } from './state';

export enum ProgressActionsType {
  SET_PROGRESS_DATA = 'progress/SET_PROGRESS_DATA',
  SET_LOADING_STATE = 'progress/SET_LOADING_STATE',
  SET_PROGRESS_RESPONSE = 'progress/SET_PROGRESS_RESPONSE',
  FETCH_PROGRESS_DATA = 'progress/FETCH_PROGRESS_DATA',
  CREATE_PROGRESS_DATA = 'progress/CREATE_PROGRESS_DATA',
  FETCH_UPDATE_PROGRESS = 'progress/FETCH_UPDATE_PROGRESS',
}

export interface FetchProgressDataActionInterface
  extends Action<ProgressActionsType> {
  type: ProgressActionsType.FETCH_PROGRESS_DATA;
  payload: number;
}

export interface CreateProgressDataActionInterface
  extends Action<ProgressActionsType> {
  type: ProgressActionsType.CREATE_PROGRESS_DATA;
  payload: CreateProgressData;
}

export interface SetProgressResponseActionInterface
  extends Action<ProgressActionsType> {
  type: ProgressActionsType.SET_PROGRESS_RESPONSE;
  payload: Response | undefined;
}

export interface SetProgressDataActionInterface extends Action<ProgressActionsType> {
  type: ProgressActionsType.SET_PROGRESS_DATA;
  payload: Progress[] | undefined;
}

export interface SetProgressLoadingStatusActionInterface
  extends Action<ProgressActionsType> {
  type: ProgressActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
