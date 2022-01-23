import {
  FetchSpecialistsDataActionInterface,
  SetSpecialistsDataActionInterface,
  SetSpecialistsLoadingStatusActionInterface,
  SetSpecialistsResponseActionInterface,
  SpecialistsActionsType,
} from './contracts/actionTypes';
import { SpecialistsState } from './contracts/state';

export const fetchSpecialistsData =
  (): FetchSpecialistsDataActionInterface => ({
    type: SpecialistsActionsType.FETCH_SPECIALISTS_DATA,
  });

export const setSpecialistsLoadingStatus = (
  payload: SpecialistsState['status'],
): SetSpecialistsLoadingStatusActionInterface => ({
  type: SpecialistsActionsType.SET_LOADING_STATE,
  payload,
});

export const setSpecialistsData = (
  payload: SpecialistsState['specialists'],
): SetSpecialistsDataActionInterface => ({
  type: SpecialistsActionsType.SET_SPECIALISTS_DATA,
  payload,
});

export const setSpecialistsResponse = (
  payload: SpecialistsState['response'],
): SetSpecialistsResponseActionInterface => ({
  type: SpecialistsActionsType.SET_SPECIALISTS_RESPONSE,
  payload,
});

export type SpecialistsActions =
  | SetSpecialistsDataActionInterface
  | SetSpecialistsLoadingStatusActionInterface
  | SetSpecialistsResponseActionInterface
  | SetSpecialistsDataActionInterface;
