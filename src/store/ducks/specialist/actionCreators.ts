import {
  FetchSpecialistDataActionInterface,
  SetSpecialistDataActionInterface,
  SetSpecialistLoadingStatusActionInterface,
  SetSpecialistResponseActionInterface,
  SpecialistActionsType,
} from './contracts/actionTypes';
import { SpecialistState } from './contracts/state';

export const fetchSpecialistData = (
  payload: number,
): FetchSpecialistDataActionInterface => ({
  type: SpecialistActionsType.FETCH_SPECIALIST_DATA,
  payload,
});

export const setSpecialistLoadingStatus = (
  payload: SpecialistState['status'],
): SetSpecialistLoadingStatusActionInterface => ({
  type: SpecialistActionsType.SET_LOADING_STATE,
  payload,
});

export const setSpecialistData = (
  payload: SpecialistState['specialist'],
): SetSpecialistDataActionInterface => ({
  type: SpecialistActionsType.SET_SPECIALIST_DATA,
  payload,
});

export const setSpecialistResponse = (
  payload: SpecialistState['response'],
): SetSpecialistResponseActionInterface => ({
  type: SpecialistActionsType.SET_SPECIALIST_RESPONSE,
  payload,
});

export type SpecialistActions =
  | SetSpecialistDataActionInterface
  | SetSpecialistLoadingStatusActionInterface
  | SetSpecialistResponseActionInterface;
