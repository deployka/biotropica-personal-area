import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import { LoadingStatus } from '../../types';
import {
  setUserData,
  setUserErrors,
  setUserLoadingStatus,
  setUserResponse,
} from './actionCreators';
import {
  FetchChangePasswordActionInterface,
  FetchForgotPasswordActionInterface,
  FetchRestorePasswordActionInterface,
  FetchSigninActionInterface,
  FetchSignupActionInterface,
  FetchUserDataActionInterface,
  UserActionsType,
} from './contracts/actionTypes';

export function* fetchSigninRequest({
  payload,
}: FetchSigninActionInterface): any {
  yield put(setUserErrors(undefined));
  yield put(setUserResponse(undefined));
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { response, data } = yield call(AuthService.signin, payload);
  if (data) {
    window.localStorage.setItem('token', data.accessToken);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserErrors(response.data));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchSignupRequest({
  payload,
}: FetchSignupActionInterface): any {
  yield put(setUserErrors(undefined));
  yield put(setUserResponse(undefined));
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { response, data } = yield call(AuthService.signup, payload);
  if (data) {
    window.localStorage.setItem('token', data.accessToken);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserErrors(response.data));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchSignoutRequest({}: FetchSignupActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthService.signout);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchForgotPasswordRequest({
  payload,
}: FetchForgotPasswordActionInterface): any {
  yield put(setUserErrors(undefined));
  yield put(setUserResponse(undefined));
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { response, data } = yield call(AuthService.forgotPassword, payload);
  if (data) {
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserErrors(response.data));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchChangePasswordRequest({
  payload,
}: FetchChangePasswordActionInterface): any {
  yield put(setUserErrors(undefined));
  yield put(setUserResponse(undefined));
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { response, data } = yield call(AuthService.changePassword, payload);
  if (data) {
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserErrors(response.data));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchRestorePasswordRequest({
  payload,
}: FetchRestorePasswordActionInterface): any {
  yield put(setUserErrors(undefined));
  yield put(setUserResponse(undefined));
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { response, data } = yield call(AuthService.restorePassword, payload);
  if (data) {
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserErrors(response.data));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUserDataRequest({}: FetchUserDataActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(UserService.getMe);
    yield put(setUserData(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* userSaga(): any {
  yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSigninRequest);
  yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignupRequest);
  yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
  yield takeLatest(UserActionsType.FETCH_SIGN_OUT, fetchSignoutRequest);
  yield takeLatest(
    UserActionsType.FETCH_FORGOT_PASSWORD,
    fetchForgotPasswordRequest
  );
  yield takeLatest(
    UserActionsType.FETCH_CHANGE_PASSWORD,
    fetchChangePasswordRequest
  );
  yield takeLatest(
    UserActionsType.FETCH_RESTORE_PASSWORD,
    fetchRestorePasswordRequest
  );
}
