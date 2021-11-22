import { call, put, takeLatest } from 'redux-saga/effects';
import { HTTP_CREATED, HTTP_SUCCESS } from '../../../http/httpConstants';
import ConsultationService from '../../../services/ConsultationService';
import { LoadingStatus } from '../../types';
import {
  setClosestConsultationData,
  setConsultationData,
  setConsultationLoadingStatus,
  setConsultationResponse,
} from './actionCreators';
import {
  FetchConsultationDataActionInterface,
  ConsultationActionsType,
  CreateConsultationDataActionInterface,
  FetchClosestConsultationDataActionInterface,
} from './contracts/actionTypes';

export function* fetchConsultationDataRequest({
  payload,
}: FetchConsultationDataActionInterface): any {
  try {
    yield put(setConsultationLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(ConsultationService.getOne, payload);
    if (status === HTTP_SUCCESS) {
      yield put(setConsultationData(data));
      yield put(setConsultationLoadingStatus(LoadingStatus.SUCCESS));
    } else {
      yield put(
        setConsultationResponse({ statusCode: status, message: data.message })
      );
      yield put(setConsultationLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {
    yield put(setConsultationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchClosestConsultationDataRequest({}: FetchClosestConsultationDataActionInterface): any {
  try {
    yield put(setConsultationLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(ConsultationService.getClosest);
    if (status === HTTP_SUCCESS) {
      yield put(setClosestConsultationData(data));
      yield put(setConsultationLoadingStatus(LoadingStatus.SUCCESS));
    } else {
      yield put(
        setConsultationResponse({ statusCode: status, message: data.message })
      );
      yield put(setConsultationLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {
    yield put(setConsultationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* createConsultationDataRequest({
  payload,
}: CreateConsultationDataActionInterface): any {
  yield put(setConsultationLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(ConsultationService.create, payload);
  if (status === HTTP_CREATED) {
    yield put(setConsultationData(data));
    yield put(
      setConsultationResponse({
        message: 'Вы успешно записались! Перейдите в чат со специалистом',
        statusCode: status,
      })
    );
    yield put(setConsultationLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setConsultationLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* consultationSaga(): any {
  yield takeLatest(
    ConsultationActionsType.FETCH_CONSULTATION_DATA,
    fetchConsultationDataRequest
  );

  yield takeLatest(
    ConsultationActionsType.CREATE_CONSULTATION_DATA,
    createConsultationDataRequest
  );
  yield takeLatest(
    ConsultationActionsType.FETCH_CLOSEST_CONSULTATION_DATA,
    fetchClosestConsultationDataRequest
  );
}
