import { call, put, takeLatest } from 'redux-saga/effects';
import { HTTP_SUCCESS } from '../../../http/httpConstants';
import SpecialistService from '../../../services/SpecialistService';
import { LoadingStatus } from '../../types';
import { setSpecialistsData, setSpecialistsLoadingStatus } from './actionCreators';
import { SpecialistsActionsType } from './contracts/actionTypes';

export function * fetchSpecialistsDataRequest() {
  try {
    yield put(setSpecialistsLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(SpecialistService.geAll);
    if (status === HTTP_SUCCESS) {
      yield put(setSpecialistsData(data));
      yield put(setSpecialistsLoadingStatus(LoadingStatus.SUCCESS));
    } else {
      yield put(setSpecialistsLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {}
}

export function * specialistsSaga() {
  yield takeLatest(
    SpecialistsActionsType.FETCH_SPECIALISTS_DATA,
    fetchSpecialistsDataRequest
  );
}
