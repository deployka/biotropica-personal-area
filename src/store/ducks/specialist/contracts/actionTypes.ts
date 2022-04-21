import { Action } from 'redux';
import { LoadingStatus, Response } from '../../../types';
import { SpecialistUser } from './state';

export enum SpecialistActionsType {
  SET_SPECIALIST_DATA = 'specialist/SET_SPECIALIST_DATA',
  SET_LOADING_STATE = 'specialist/SET_LOADING_STATE',
  SET_SPECIALIST_RESPONSE = 'specialist/SET_SPECIALIST_RESPONSE',
  FETCH_SPECIALIST_DATA = 'specialist/FETCH_SPECIALIST_DATA',
}

export interface FetchSpecialistDataActionInterface
  extends Action<SpecialistActionsType> {
  type: SpecialistActionsType.FETCH_SPECIALIST_DATA;
  payload: number;
}

export interface SetSpecialistResponseActionInterface
  extends Action<SpecialistActionsType> {
  type: SpecialistActionsType.SET_SPECIALIST_RESPONSE;
  payload: Response | undefined;
}

export interface SetSpecialistDataActionInterface
  extends Action<SpecialistActionsType> {
  type: SpecialistActionsType.SET_SPECIALIST_DATA;
  payload: SpecialistUser | undefined;
}

export interface SetSpecialistLoadingStatusActionInterface
  extends Action<SpecialistActionsType> {
  type: SpecialistActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
