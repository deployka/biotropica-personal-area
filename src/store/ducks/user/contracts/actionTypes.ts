import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import {
  ChangePasswordData,
  ForgotPasswordData,
  RestorePasswordData,
  SigninData,
  SignupData,
  UpdateUserData,
  User,
  UserState,
} from './state';

export enum UserActionsType {
  SET_USER_DATA = 'user/SET_USER_DATA',
  SET_LOADING_STATE = 'user/SET_LOADING_STATE',
  SET_USER_RESPONSE = 'user/SET_USER_RESPONSE',
  FETCH_USER_DATA = 'user/FETCH_USER_DATA',
  FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',
  FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
  FETCH_SIGN_OUT = 'user/FETCH_SIGN_OUT',
  FETCH_REFRESH = 'user/FETCH_REFRESH',
  FETCH_CHANGE_PASSWORD = 'user/FETCH_CHANGE_PASSWORD',
  FETCH_FORGOT_PASSWORD = 'user/FETCH_FORGOT_PASSWORD',
  FETCH_RESTORE_PASSWORD = 'user/FETCH_RESTORE_PASSWORD',
  FETCH_UPDATE_USER = 'user/FETCH_UPDATE_USER',
}

export interface FetchSigninActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_IN;
  payload: SigninData;
}

export interface FetchSignupActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_UP;
  payload: SignupData;
}

export interface FetchSignoutActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_SIGN_OUT;
}

export interface FetchForgotPasswordActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.FETCH_FORGOT_PASSWORD;
  payload: ForgotPasswordData;
}

export interface FetchChangePasswordActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.FETCH_CHANGE_PASSWORD;
  payload: ChangePasswordData;
}

export interface FetchRestorePasswordActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.FETCH_RESTORE_PASSWORD;
  payload: RestorePasswordData;
}
export interface FetchUpdateUserActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.FETCH_UPDATE_USER;
  payload: FormData;
}

export interface FetchUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_DATA;
}

export interface SetUserResponseActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_USER_RESPONSE;
  payload: any;
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_USER_DATA;
  payload: User | undefined;
}

export interface SetUserLoadingStatusActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
