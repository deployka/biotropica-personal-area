import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../../services/AuthService';
import SpecialistService from '../../../services/SpecialistService';
import { LoadingStatus } from '../../types';
import {
  setSpecialistData,
  setSpecialistLoadingStatus,
  setSpecialistResponse,
} from './actionCreators';
import {
  FetchSpecialistDataActionInterface,
  SpecialistActionsType,
} from './contracts/actionTypes';

export function* fetchSpecialistDataRequest({
  payload,
}: FetchSpecialistDataActionInterface): any {
  try {
    yield put(setSpecialistLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(SpecialistService.getOne, payload);
    if (status === 200) {
      yield put(setSpecialistData(data));
      yield put(setSpecialistLoadingStatus(LoadingStatus.SUCCESS));
      yield put(setSpecialistLoadingStatus(LoadingStatus.LOADED));
    } else {
      yield put(setSpecialistLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {}
}

export function* specialistSaga(): any {
  yield takeLatest(
    SpecialistActionsType.FETCH_SPECIALIST_DATA,
    fetchSpecialistDataRequest
  );
}
