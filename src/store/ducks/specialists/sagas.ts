import { call, put, takeLatest } from 'redux-saga/effects';
import SpecialistService from '../../../services/SpecialistService';
import { LoadingStatus } from '../../types';
import {
  setSpecialistsData,
  setSpecialistsLoadingStatus,
} from './actionCreators';
import {
  FetchSpecialistsDataActionInterface,
  SpecialistsActionsType,
} from './contracts/actionTypes';

export function* fetchSpecialistsDataRequest({}: FetchSpecialistsDataActionInterface): any {
  try {
    yield put(setSpecialistsLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(SpecialistService.geAll);
    if (status === 200) {
      yield put(setSpecialistsData(data));
      yield put(setSpecialistsLoadingStatus(LoadingStatus.SUCCESS));
    } else {
      yield put(setSpecialistsLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {}
}

export function* specialistsSaga(): any {
  yield takeLatest(
    SpecialistsActionsType.FETCH_SPECIALISTS_DATA,
    fetchSpecialistsDataRequest
  );
}
