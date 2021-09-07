import { call, put, takeLatest } from 'redux-saga/effects';
import GoalService from '../../../services/GoalService';
import { LoadingStatus } from '../../types';
import {
  setGoalsData,
  setGoalsLoadingStatus,
  setGoalsResponse,
} from './actionCreators';
import {
  FetchGoalsDataActionInterface,
  GoalsActionsType,
} from './contracts/actionTypes';

export function* fetchGoalsDataRequest({}: FetchGoalsDataActionInterface): any {
  yield put(setGoalsLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(GoalService.geAll);
  if (status === 200) {
    yield put(setGoalsData(data));
    yield put(setGoalsLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setGoalsLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* goalsSaga(): any {
  yield takeLatest(GoalsActionsType.FETCH_GOALS_DATA, fetchGoalsDataRequest);
}
