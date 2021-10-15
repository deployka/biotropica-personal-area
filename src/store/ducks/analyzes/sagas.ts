import { call, put, takeLatest } from 'redux-saga/effects';
import AnalyzeService from '../../../services/AnalyzeService';
import { LoadingStatus } from '../../types';
import {
  setAnalyzeData,
  setAnalyzeLoadingStatus,
  setAnalyzeResponse,
} from './actionCreators';
import {
  UpdateAnalyzeActionInterface,
  FetchAnalyzeDataActionInterface,
  AnalyzeActionsType,
  CreateAnalyzeDataActionInterface,
  DeleteAnalyzeActionInterface,
} from './contracts/actionTypes';

export function* fetchAnalyzeDataRequest({
  payload,
}: FetchAnalyzeDataActionInterface): any {
  yield put(setAnalyzeLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AnalyzeService.getOne, payload);
  if (status === 200) {
    yield put(setAnalyzeData(data));
    yield put(setAnalyzeLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(
      setAnalyzeResponse({ statusCode: status, message: data.message })
    );
    yield put(setAnalyzeLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* createAnalyzeDataRequest({
  payload,
}: CreateAnalyzeDataActionInterface): any {
  yield put(setAnalyzeLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AnalyzeService.create, payload);
  if (status === 201) {
    yield put(setAnalyzeData(data));
    yield put(setAnalyzeLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setAnalyzeLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUpdateAnalyzeRequest({
  payload,
}: UpdateAnalyzeActionInterface): any {
  yield put(setAnalyzeLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AnalyzeService.update, payload);
  if (status === 200) {
    yield put(setAnalyzeData(data));
    yield put(
      setAnalyzeResponse({ statusCode: status, message: 'Данные обновлены' })
    );
    yield put(setAnalyzeLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setAnalyzeResponse(data));
    yield put(setAnalyzeLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchDeleteAnalyzeRequest({
  payload,
}: DeleteAnalyzeActionInterface): any {
  yield put(setAnalyzeLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AnalyzeService.delete, payload);
  if (status === 200) {
    yield put(setAnalyzeData(undefined));
    yield put(
      setAnalyzeResponse({ statusCode: status, message: data.message })
    );
    yield put(setAnalyzeLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setAnalyzeResponse(data));
    yield put(setAnalyzeLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* analyzeSaga(): any {
  yield takeLatest(
    AnalyzeActionsType.FETCH_ANALYZE_DATA,
    fetchAnalyzeDataRequest
  );
  yield takeLatest(
    AnalyzeActionsType.FETCH_UPDATE_ANALYZE,
    fetchUpdateAnalyzeRequest
  );
  yield takeLatest(
    AnalyzeActionsType.CREATE_ANALYZE_DATA,
    createAnalyzeDataRequest
  );
  yield takeLatest(
    AnalyzeActionsType.FETCH_DELETE_ANALYZE,
    fetchDeleteAnalyzeRequest
  );
}
