import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import { LoadingStatus } from '../../types';
import {
  setUserData,
  setUserLoadingStatus,
  setUserResponse,
} from './actionCreators';
import {
  FetchChangePasswordActionInterface,
  FetchForgotPasswordActionInterface,
  FetchRestorePasswordActionInterface,
  FetchSigninActionInterface,
  FetchSignupActionInterface,
  FetchUpdateUserActionInterface,
  FetchUserDataActionInterface,
  UserActionsType,
} from './contracts/actionTypes';

export function* fetchSigninRequest({
  payload,
}: FetchSigninActionInterface): any {
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AuthService.signin, payload);
  yield put(setUserResponse(data));
  if (status === 200) {
    window.localStorage.setItem('token', data.accessToken);
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchSignupRequest({
  payload,
}: FetchSignupActionInterface): any {
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AuthService.signup, payload);
  yield put(setUserResponse(data));
  if (status === 200) {
    window.localStorage.setItem('token', data.accessToken);
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
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
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AuthService.forgotPassword, payload);
  yield put(setUserResponse(data));
  if (status === 200) {
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchChangePasswordRequest({
  payload,
}: FetchChangePasswordActionInterface): any {
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AuthService.changePassword, payload);
  yield put(setUserResponse(data));
  if (status === 200) {
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchRestorePasswordRequest({
  payload,
}: FetchRestorePasswordActionInterface): any {
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AuthService.restorePassword, payload);
  yield put(setUserResponse(data));
  if (status === 200) {
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchCreatePasswordRequest({
  payload,
}: FetchRestorePasswordActionInterface): any {
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(AuthService.createPassword, payload);
  yield put(setUserResponse(data));
  if (status === 200) {
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUserDataRequest({}: FetchUserDataActionInterface): any {
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(UserService.getMe);
  if (status === 200) {
    yield put(setUserData(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUpdateUserRequest({
  payload,
}: FetchUpdateUserActionInterface): any {
  yield put(setUserLoadingStatus(LoadingStatus.LOADING));
  const { data, status } = yield call(UserService.update, payload);
  if (status === 200) {
    yield put(setUserData(data));
    yield put(
      setUserResponse({ statusCode: status, message: 'Данные обновлены' })
    );
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } else {
    yield put(setUserResponse(data));
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
  yield takeLatest(UserActionsType.FETCH_UPDATE_USER, fetchUpdateUserRequest);
  yield takeLatest(
    UserActionsType.FETCH_CREATE_PASSWORD,
    fetchCreatePasswordRequest
  );
}
