import { call, put, takeLatest, select } from 'redux-saga/effects';
import AnalyzeService from '../../../services/AnalyzeService';
import { LoadingStatus } from '../../types';
import {
  setAnalyzesData,
  setAnalyzesLoadingStatus,
  setAnalyzesResponse,
} from './actionCreators';
import {
  FetchAnalyzesDataActionInterface,
  AnalyzesActionsType,
} from './contracts/actionTypes';
import { selectAnalyzesData } from './selectors';

export function* fetchAnalyzesDataRequest({
  payload,
}: FetchAnalyzesDataActionInterface): any {
  try {
    yield put(setAnalyzesLoadingStatus(LoadingStatus.LOADING));

    const { data, status } = yield call(
      AnalyzeService.geAll,
      payload.offset,
      payload.limit
    );
    if (status === 200) {
      if (payload.offset) {
        const prevData = yield select(selectAnalyzesData);
        yield put(setAnalyzesData([...prevData, ...data]));
      } else {
        yield put(setAnalyzesData(data));
      }
      yield put(setAnalyzesResponse(data.length));
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
