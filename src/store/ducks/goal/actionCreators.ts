import {
  FetchGoalDataActionInterface,
  SetGoalDataActionInterface,
  SetGoalLoadingStatusActionInterface,
  SetGoalResponseActionInterface,
  GoalActionsType,
  CreateGoalDataActionInterface,
  UpdateGoalActionInterface,
} from './contracts/actionTypes';
import { CreateGoalData, GoalState, UpdateGoalData } from './contracts/state';

export const fetchGoalData = (
  payload: number
): FetchGoalDataActionInterface => ({
  type: GoalActionsType.FETCH_GOAL_DATA,
  payload,
});

export const createGoalData = (
  payload: CreateGoalData
): CreateGoalDataActionInterface => ({
  type: GoalActionsType.CREATE_GOAL_DATA,
  payload,
});
export const updateGoalData = (
  payload: UpdateGoalData
): UpdateGoalActionInterface => ({
  type: GoalActionsType.FETCH_UPDATE_GOAL,
  payload,
});

export const setGoalLoadingStatus = (
  payload: GoalState['status']
): SetGoalLoadingStatusActionInterface => ({
  type: GoalActionsType.SET_LOADING_STATE,
  payload,
});

export const setGoalData = (
  payload: GoalState['goal']
): SetGoalDataActionInterface => ({
  type: GoalActionsType.SET_GOAL_DATA,
  payload,
});

export const setGoalResponse = (
  payload: GoalState['response']
): SetGoalResponseActionInterface => ({
  type: GoalActionsType.SET_GOAL_RESPONSE,
  payload,
});

export type GoalActions =
  | SetGoalDataActionInterface
  | SetGoalLoadingStatusActionInterface
  | SetGoalResponseActionInterface;
