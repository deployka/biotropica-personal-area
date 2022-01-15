import { Action } from 'redux';
import { LoadingStatus, Response } from '../../../types';
import { Goal } from '../../goal/contracts/state';

export enum GoalsActionsType {
  SET_GOALS_DATA = 'goals/SET_GOALS_DATA',
  SET_LOADING_STATE = 'goals/SET_LOADING_STATE',
  SET_GOALS_RESPONSE = 'goals/SET_GOALS_RESPONSE',
  FETCH_GOALS_DATA = 'goals/FETCH_GOALS_DATA',
}

export interface FetchGoalsDataActionInterface extends Action<GoalsActionsType> {
  type: GoalsActionsType.FETCH_GOALS_DATA;
}

export interface SetGoalsResponseActionInterface extends Action<GoalsActionsType> {
  type: GoalsActionsType.SET_GOALS_RESPONSE;
  payload: Response | undefined;
}

export interface SetGoalsDataActionInterface extends Action<GoalsActionsType> {
  type: GoalsActionsType.SET_GOALS_DATA;
  payload: Goal[] | undefined;
}

export interface SetGoalsLoadingStatusActionInterface
  extends Action<GoalsActionsType> {
  type: GoalsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
