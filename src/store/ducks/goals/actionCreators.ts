import {
  FetchGoalsDataActionInterface,
  SetGoalsDataActionInterface,
  SetGoalsLoadingStatusActionInterface,
  SetGoalsResponseActionInterface,
  GoalsActionsType,
} from './contracts/actionTypes';
import { GoalsState } from './contracts/state';

export const fetchGoalsData = (): FetchGoalsDataActionInterface => ({
  type: GoalsActionsType.FETCH_GOALS_DATA,
});

export const setGoalsLoadingStatus = (
  payload: GoalsState['status'],
): SetGoalsLoadingStatusActionInterface => ({
  type: GoalsActionsType.SET_LOADING_STATE,
  payload,
});

export const setGoalsData = (
  payload: GoalsState['goals'],
): SetGoalsDataActionInterface => ({
  type: GoalsActionsType.SET_GOALS_DATA,
  payload,
});

export const setGoalsResponse = (
  payload: GoalsState['response'],
): SetGoalsResponseActionInterface => ({
  type: GoalsActionsType.SET_GOALS_RESPONSE,
  payload,
});

export type GoalsActions =
  | SetGoalsDataActionInterface
  | SetGoalsLoadingStatusActionInterface
  | SetGoalsResponseActionInterface
  | SetGoalsDataActionInterface;
