import { call, put, takeLatest } from 'redux-saga/effects';
import AnalyzeService from '../../../services/AnalyzeService';
import { LoadingStatus } from '../../types';
import { setAnalyzesData, setAnalyzesLoadingStatus } from './actionCreators';
import {
  FetchAnalyzesDataActionInterface,
  AnalyzesActionsType,
} from './contracts/actionTypes';

export function* fetchAnalyzesDataRequest({
  payload,
}: FetchAnalyzesDataActionInterface): any {
  try {
    yield put(setAnalyzesLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(AnalyzeService.geAll, payload);
    if (status === 200) {
      yield put(setAnalyzesData(data));
      yield put(setAnalyzesLoadingStatus(LoadingStatus.SUCCESS));
    } else {
      yield put(setAnalyzesLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {}
}

export function* analyzesSaga(): any {
  yield takeLatest(
    AnalyzesActionsType.FETCH_ANALYZES_DATA,
    fetchAnalyzesDataRequest
  );
}
