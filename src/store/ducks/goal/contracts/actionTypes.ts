import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { UpdateGoalData, Goal, GoalState, CreateGoalData } from './state';

export enum GoalActionsType {
  SET_GOAL_DATA = 'goal/SET_GOAL_DATA',
  SET_GOALS_DATA = 'goal/SET_GOALS_DATA',
  SET_LOADING_STATE = 'goal/SET_LOADING_STATE',
  SET_GOAL_RESPONSE = 'goal/SET_GOAL_RESPONSE',
  FETCH_GOAL_DATA = 'goal/FETCH_GOAL_DATA',
  CREATE_GOAL_DATA = 'goal/CREATE_GOAL_DATA',
  FETCH_GOALS_DATA = 'goal/FETCH_GOALS_DATA',
  FETCH_UPDATE_GOAL = 'goal/FETCH_UPDATE_GOAL',
}

export interface UpdateGoalActionInterface extends Action<GoalActionsType> {
  type: GoalActionsType.FETCH_UPDATE_GOAL;
  payload: UpdateGoalData;
}

export interface FetchGoalDataActionInterface extends Action<GoalActionsType> {
  type: GoalActionsType.FETCH_GOAL_DATA;
  payload: number;
}

export interface CreateGoalDataActionInterface extends Action<GoalActionsType> {
  type: GoalActionsType.CREATE_GOAL_DATA;
  payload: CreateGoalData;
}

export interface SetGoalResponseActionInterface
  extends Action<GoalActionsType> {
  type: GoalActionsType.SET_GOAL_RESPONSE;
  payload: any;
}

export interface SetGoalDataActionInterface extends Action<GoalActionsType> {
  type: GoalActionsType.SET_GOAL_DATA;
  payload: Goal | undefined;
}

export interface SetGoalLoadingStatusActionInterface
  extends Action<GoalActionsType> {
  type: GoalActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
