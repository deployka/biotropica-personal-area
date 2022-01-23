import {
  FetchProgressDataActionInterface,
  SetProgressDataActionInterface,
  SetProgressLoadingStatusActionInterface,
  SetProgressResponseActionInterface,
  ProgressActionsType,
  CreateProgressDataActionInterface,
} from './contracts/actionTypes';
import { CreateProgressData, ProgressState } from './contracts/state';

export const fetchProgressData = (
  payload: number,
): FetchProgressDataActionInterface => ({
  type: ProgressActionsType.FETCH_PROGRESS_DATA,
  payload,
});

export const createProgressData = (
  payload: CreateProgressData,
): CreateProgressDataActionInterface => ({
  type: ProgressActionsType.CREATE_PROGRESS_DATA,
  payload,
});

export const setProgressLoadingStatus = (
  payload: ProgressState['status'],
): SetProgressLoadingStatusActionInterface => ({
  type: ProgressActionsType.SET_LOADING_STATE,
  payload,
});

export const setProgressData = (
  payload: ProgressState['progress'],
): SetProgressDataActionInterface => ({
  type: ProgressActionsType.SET_PROGRESS_DATA,
  payload,
});

export const setProgressResponse = (
  payload: ProgressState['response'],
): SetProgressResponseActionInterface => ({
  type: ProgressActionsType.SET_PROGRESS_RESPONSE,
  payload,
});

export type ProgressActions =
  | SetProgressDataActionInterface
  | SetProgressLoadingStatusActionInterface
  | SetProgressResponseActionInterface;
