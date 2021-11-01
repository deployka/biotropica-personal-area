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

export function* fetchGoalDataRequest({
  payload,
}: FetchGoalDataActionInterface): any {
  yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(GoalService.getOne, payload);
  if (status === 200) {
    yield put(setGoalData(data));
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setGoalResponse({ statusCode: status, message: data.message }));
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* createGoalDataRequest({
  payload,
}: CreateGoalDataActionInterface): any {
  yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(GoalService.create, payload);
  if (status === 201) {
    yield put(setGoalData(data));
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUpdateGoalRequest({
  payload,
}: UpdateGoalActionInterface): any {
  yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(GoalService.update, payload);
  if (status === 200) {
    yield put(setGoalData(data));
    yield put(
      setGoalResponse({ statusCode: status, message: 'Данные обновлены' })
    );
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setGoalResponse(data));
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchDeleteGoalRequest({
  payload,
}: DeleteGoalActionInterface): any {
  yield put(setGoalLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(GoalService.delete, payload);
  if (status === 200) {
    yield put(setGoalData(undefined));
    yield put(setGoalResponse({ statusCode: status, message: data.message }));
    yield put(setGoalLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setGoalResponse(data));
    yield put(setGoalLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* goalSaga(): any {
  yield takeLatest(GoalActionsType.FETCH_GOAL_DATA, fetchGoalDataRequest);
  yield takeLatest(GoalActionsType.FETCH_UPDATE_GOAL, fetchUpdateGoalRequest);
  yield takeLatest(GoalActionsType.CREATE_GOAL_DATA, createGoalDataRequest);
  yield takeLatest(GoalActionsType.FETCH_DELETE_GOAL, fetchDeleteGoalRequest);
}
