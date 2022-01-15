import { call, put, takeLatest } from 'redux-saga/effects';
import GoalService from '../../../services/GoalService';
import { LoadingStatus } from '../../types';
import {
  setGoalData,
  setGoalLoadingStatus,
  setGoalResponse,
} from './actionCreators';
import {
  UpdateGoalActionInterface,
  FetchGoalDataActionInterface,
  GoalActionsType,
  CreateGoalDataActionInterface,
  DeleteGoalActionInterface,
} from './contracts/actionTypes';

export function * fetchGoalDataRequest({ payload }: FetchGoalDataActionInterface) {
  try {
    yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(GoalService.getOne, payload);
    yield put(setGoalData(data));
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setGoalLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * createGoalDataRequest({ payload }: CreateGoalDataActionInterface) {
  try {
    yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(GoalService.create, payload);
    yield put(setGoalData(data));
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setGoalLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * fetchUpdateGoalRequest({ payload }: UpdateGoalActionInterface) {
  try {
    yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(GoalService.update, payload);
    yield put(setGoalData(data));
    yield put(setGoalResponse({ statusCode: status, message: 'Данные обновлены' }));
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setGoalLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * fetchDeleteGoalRequest({ payload }: DeleteGoalActionInterface) {
  yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(GoalService.delete, payload);
  if (status === 200) {
    yield put(setGoalData(undefined));
    yield put(setGoalResponse({ statusCode: status, message: data.message }));
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setGoalLoadingStatus(LoadingStatus.LOADED));
  } else {
    yield put(setGoalResponse(data));
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * goalSaga() {
  yield takeLatest(GoalActionsType.FETCH_GOAL_DATA, fetchGoalDataRequest);
  yield takeLatest(GoalActionsType.FETCH_UPDATE_GOAL, fetchUpdateGoalRequest);
  yield takeLatest(GoalActionsType.CREATE_GOAL_DATA, createGoalDataRequest);
  yield takeLatest(GoalActionsType.FETCH_DELETE_GOAL, fetchDeleteGoalRequest);
}
