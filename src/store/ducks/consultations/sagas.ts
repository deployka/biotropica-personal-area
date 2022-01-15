import { call, put, takeLatest } from 'redux-saga/effects';
import ConsultationService from '../../../services/ConsultationService';
import { LoadingStatus } from '../../types';
import {
  setConsultationsData,
  setConsultationsLoadingStatus,
} from './actionCreators';
import {
  FetchConsultationsDataActionInterface,
  ConsultationsActionsType,
} from './contracts/actionTypes';

export function * fetchConsultationsDataRequest(
  _: FetchConsultationsDataActionInterface
) {
  try {
    yield put(setConsultationsLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(ConsultationService.geAll);
    yield put(setConsultationsData(data));
    yield put(setConsultationsLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setConsultationsLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setConsultationsLoadingStatus(LoadingStatus.ERROR));
  }
}

export function * consultationsSaga() {
  yield takeLatest(
    ConsultationsActionsType.FETCH_CONSULTATIONS_DATA,
    fetchConsultationsDataRequest
  );
}
