import { call, put, takeLatest } from 'redux-saga/effects';
import ProgressService from '../../../services/ProgressService';
import { LoadingStatus } from '../../types';
import {
  setProgressData,
  setProgressLoadingStatus,
  setProgressResponse,
} from './actionCreators';
import {
  FetchProgressDataActionInterface,
  ProgressActionsType,
  CreateProgressDataActionInterface,
} from './contracts/actionTypes';

export function* fetchProgressDataRequest({}: FetchProgressDataActionInterface): any {
  yield put(setProgressLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(ProgressService.getAll);
  if (status === 200) {
    yield put(setProgressData(data));
    yield put(setProgressLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(
      setProgressResponse({ statusCode: status, message: data.message })
    );
    yield put(setProgressLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* createProgressDataRequest({
  payload,
}: CreateProgressDataActionInterface): any {
  yield put(setProgressLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(ProgressService.create, payload);
  if (status === 201) {
    yield put(setProgressData(data));
    yield put(setProgressLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setProgressLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* progressSaga(): any {
  yield takeLatest(
    ProgressActionsType.FETCH_PROGRESS_DATA,
    fetchProgressDataRequest
  );

  yield takeLatest(
    ProgressActionsType.CREATE_PROGRESS_DATA,
    createProgressDataRequest
  );
}
