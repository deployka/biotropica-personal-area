import {
  FetchChangePasswordActionInterface,
  FetchForgotPasswordActionInterface,
  FetchRestorePasswordActionInterface,
  FetchSigninActionInterface,
  FetchSignoutActionInterface,
  FetchSignupActionInterface,
  FetchUserDataActionInterface,
  SetUserDataActionInterface,
  SetUserErrorsActionInterface,
  SetUserLoadingStatusActionInterface,
  SetUserResponseActionInterface,
  UserActionsType,
} from './contracts/actionTypes';
import {
  ChangePasswordData,
  ForgotPasswordData,
  RestorePasswordData,
  SigninData,
  SignupData,
  User,
  UserState,
} from './contracts/state';

export const fetchUserData = (): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
});

export const fetchSignin = (
  payload: SigninData
): FetchSigninActionInterface => ({
  type: UserActionsType.FETCH_SIGN_IN,
  payload,
});

export const fetchSignout = (): FetchSignoutActionInterface => ({
  type: UserActionsType.FETCH_SIGN_OUT,
});

export const fetchSignup = (
  payload: SignupData
): FetchSignupActionInterface => ({
  type: UserActionsType.FETCH_SIGN_UP,
  payload,
});

export const fetchChangePassword = (
  payload: ChangePasswordData
): FetchChangePasswordActionInterface => ({
  type: UserActionsType.FETCH_CHANGE_PASSWORD,
  payload,
});

export const fetchForgotPassword = (
  payload: ForgotPasswordData
): FetchForgotPasswordActionInterface => ({
  type: UserActionsType.FETCH_FORGOT_PASSWORD,
  payload,
});

export const fetchRestorePassword = (
  payload: RestorePasswordData
): FetchRestorePasswordActionInterface => ({
  type: UserActionsType.FETCH_RESTORE_PASSWORD,
  payload,
});

export const setUserLoadingStatus = (
  payload: UserState['status']
): SetUserLoadingStatusActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});

export const setUserData = (
  payload: UserState['data']
): SetUserDataActionInterface => ({
  type: UserActionsType.SET_USER_DATA,
  payload,
});

export const setUserErrors = (
  payload: UserState['errors']
): SetUserErrorsActionInterface => ({
  type: UserActionsType.SET_USER_ERRORS,
  payload,
});

export const setUserResponse = (
  payload: UserState['response']
): SetUserResponseActionInterface => ({
  type: UserActionsType.SET_USER_RESPONSE,
  payload,
});

export type UserActions =
  | SetUserDataActionInterface
  | SetUserLoadingStatusActionInterface
  | SetUserErrorsActionInterface
  | SetUserResponseActionInterface;
