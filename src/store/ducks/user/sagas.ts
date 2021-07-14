import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import { LoadingStatus } from '../../types';
import { setUserData, setUserLoadingStatus } from './actionCreators';
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
  try {
    const { data } = yield call(AuthService.signin, payload);
    window.localStorage.setItem('token', data.accessToken);
    yield put(setUserData(data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchSignupRequest({
  payload,
}: FetchSignupActionInterface): any {
  try {
    const { data } = yield call(AuthService.signup, payload);
    window.localStorage.setItem('token', data.accessToken);
    yield put(setUserData(data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchSignoutRequest({}: FetchSignupActionInterface): any {
  try {
    const { data } = yield call(AuthService.signout);
    console.log(data);
    yield put(setUserData(data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchForgotPasswordRequest({
  payload,
}: FetchForgotPasswordActionInterface): any {
  try {
    const { data } = yield call(AuthService.forgotPassword, payload);
    yield put(setUserData(data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchChangePasswordRequest({
  payload,
}: FetchChangePasswordActionInterface): any {
  try {
    const { data } = yield call(AuthService.changePassword, payload);
    yield put(setUserData(data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchRestorePasswordRequest({
  payload,
}: FetchRestorePasswordActionInterface): any {
  try {
    const { data } = yield call(AuthService.restorePassword, payload);
    yield put(setUserData(data));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUserDataRequest({}: FetchUserDataActionInterface): any {
  try {
    const { data } = yield call(UserService.getMe);
    yield put(setUserData(data));
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
