import { Action } from 'redux';
import { LoadingStatus, Response } from '../../../types';
import { Specialist, SpecialistUser } from '../../specialist/contracts/state';

export enum SpecialistsActionsType {
  SET_SPECIALISTS_DATA = 'specialists/SET_SPECIALISTS_DATA',
  SET_LOADING_STATE = 'specialists/SET_LOADING_STATE',
  SET_SPECIALISTS_RESPONSE = 'specialists/SET_SPECIALISTS_RESPONSE',
  FETCH_SPECIALISTS_DATA = 'specialists/FETCH_SPECIALISTS_DATA',
}

export interface FetchSpecialistsDataActionInterface
  extends Action<SpecialistsActionsType> {
  type: SpecialistsActionsType.FETCH_SPECIALISTS_DATA;
}

export interface SetSpecialistsResponseActionInterface
  extends Action<SpecialistsActionsType> {
  type: SpecialistsActionsType.SET_SPECIALISTS_RESPONSE;
  payload: Response | undefined;
}

export interface SetSpecialistsDataActionInterface
  extends Action<SpecialistsActionsType> {
  type: SpecialistsActionsType.SET_SPECIALISTS_DATA;
  payload: SpecialistUser[] | [];
}

export interface SetSpecialistsLoadingStatusActionInterface
  extends Action<SpecialistsActionsType> {
  type: SpecialistsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
