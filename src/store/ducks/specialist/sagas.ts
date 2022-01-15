import { call, put, takeLatest } from 'redux-saga/effects';
import SpecialistService from '../../../services/SpecialistService';
import { LoadingStatus } from '../../types';
import { setSpecialistData, setSpecialistLoadingStatus } from './actionCreators';
import {
  FetchSpecialistDataActionInterface,
  SpecialistActionsType,
} from './contracts/actionTypes';

export function * fetchSpecialistDataRequest({
  payload,
}: FetchSpecialistDataActionInterface) {
  try {
    yield put(setSpecialistLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(SpecialistService.getOne, payload);
    yield put(setSpecialistData(data));
    yield put(setSpecialistLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setSpecialistLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setSpecialistLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * specialistSaga() {
  yield takeLatest(
    SpecialistActionsType.FETCH_SPECIALIST_DATA,
    fetchSpecialistDataRequest
  );
}
