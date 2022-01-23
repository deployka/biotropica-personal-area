import { call, put, takeLatest } from 'redux-saga/effects';
import GoalService from '../../../services/GoalService';
import { LoadingStatus } from '../../types';
import { setGoalsData, setGoalsLoadingStatus } from './actionCreators';
import { GoalsActionsType } from './contracts/actionTypes';

export function * fetchGoalsDataRequest() {
  try {
    yield put(setGoalsLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(GoalService.geAll);
    yield put(setGoalsData(data));
    yield put(setGoalsLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setGoalsLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setGoalsLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * goalsSaga() {
  yield takeLatest(GoalsActionsType.FETCH_GOALS_DATA, fetchGoalsDataRequest);
}
