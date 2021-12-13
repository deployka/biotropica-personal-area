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
  FetchUserDataByIdActionInterface,
  FetchUpdateUserEmailActionInterface,
  UserActionsType,
} from './contracts/actionTypes';

export function* fetchSigninRequest({
  payload,
}: FetchSigninActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthService.signin, payload);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    window.localStorage.setItem('token', data.accessToken);
    yield put(setUserLoadingStatus(LoadingStatus.LOADED));
    yield put(setUserResponse(undefined));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchSignupRequest({
  payload,
}: FetchSignupActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthService.signup, payload);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
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
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthService.forgotPassword, payload);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchChangePasswordRequest({
  payload,
}: FetchChangePasswordActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthService.changePassword, payload);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchRestorePasswordRequest({
  payload,
}: FetchRestorePasswordActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthService.restorePassword, payload);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchCreatePasswordRequest({
  payload,
}: FetchRestorePasswordActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthService.createPassword, payload);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUserDataRequest({}: FetchUserDataActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(UserService.getMe);
    yield put(setUserData(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setUserLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUserDataByIdRequest({
  payload,
}: FetchUserDataByIdActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(UserService.getOne, payload);
    yield put(setUserData(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setUserLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUpdateUserEmailRequest({
  payload,
}: FetchUpdateUserEmailActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(UserService.updateEmail, payload);
    yield put(setUserResponse(data));
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    yield put(setUserLoadingStatus(LoadingStatus.LOADED));
  } catch (error) {
    yield put(setUserResponse(undefined));
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchUpdateUserRequest({
  payload,
}: FetchUpdateUserActionInterface): any {
  try {
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    const { data, status } = yield call(UserService.update, payload);
    yield put(setUserData(data));
    yield put(
      setUserResponse({ statusCode: status, message: 'Данные обновлены' })
    );
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
  yield takeLatest(
    UserActionsType.FETCH_UPDATE_USER_EMAIL,
    fetchUpdateUserEmailRequest
  );
  yield takeLatest(UserActionsType.FETCH_UPDATE_USER, fetchUpdateUserRequest);
  yield takeLatest(
    UserActionsType.FETCH_CREATE_PASSWORD,
    fetchCreatePasswordRequest
  );
  yield takeLatest(
    UserActionsType.FETCH_USER_DATA_BY_ID,
    fetchUserDataByIdRequest
  );
}
