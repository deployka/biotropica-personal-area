import {
  FetchChangePasswordActionInterface,
  FetchCreatePasswordActionInterface,
  FetchForgotPasswordActionInterface,
  FetchRestorePasswordActionInterface,
  FetchSigninActionInterface,
  FetchSignoutActionInterface,
  FetchSignupActionInterface,
  FetchUpdateUserActionInterface,
  FetchUserDataActionInterface,
  FetchUpdateUserEmailActionInterface,
  SetUserDataActionInterface,
  SetUserLoadingStatusActionInterface,
  SetUserResponseActionInterface,
  SetUserDataByIdActionInterface,
  UserActionsType,
  FetchUserDataByIdActionInterface,
} from './contracts/actionTypes';
import {
  ChangePasswordData,
  ForgotPasswordData,
  RestorePasswordData,
  SigninData,
  SignupData,
  UpdateEmailData,
  UpdateUserData,
  UserState,
} from './contracts/state';

export const fetchUserData = (): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
});

export const fetchUserDataById = (
  payload: number,
): FetchUserDataByIdActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA_BY_ID,
  payload,
});

export const fetchSignin = (
  payload: SigninData,
): FetchSigninActionInterface => ({
  type: UserActionsType.FETCH_SIGN_IN,
  payload,
});

export const fetchUpdateUserEmail = (
  payload: UpdateEmailData,
): FetchUpdateUserEmailActionInterface => ({
  type: UserActionsType.FETCH_UPDATE_USER_EMAIL,
  payload,
});

export const fetchSignout = (): FetchSignoutActionInterface => ({
  type: UserActionsType.FETCH_SIGN_OUT,
});

export const fetchSignup = (
  payload: SignupData,
): FetchSignupActionInterface => ({
  type: UserActionsType.FETCH_SIGN_UP,
  payload,
});

export const fetchUpdateUser = (
  payload: UpdateUserData,
): FetchUpdateUserActionInterface => ({
  type: UserActionsType.FETCH_UPDATE_USER,
  payload,
});

export const fetchChangePassword = (
  payload: ChangePasswordData,
): FetchChangePasswordActionInterface => ({
  type: UserActionsType.FETCH_CHANGE_PASSWORD,
  payload,
});

export const fetchForgotPassword = (
  payload: ForgotPasswordData,
): FetchForgotPasswordActionInterface => ({
  type: UserActionsType.FETCH_FORGOT_PASSWORD,
  payload,
});

export const fetchRestorePassword = (
  payload: RestorePasswordData,
): FetchRestorePasswordActionInterface => ({
  type: UserActionsType.FETCH_RESTORE_PASSWORD,
  payload,
});

export const fetchCreatePassword = (
  payload: RestorePasswordData,
): FetchCreatePasswordActionInterface => ({
  type: UserActionsType.FETCH_CREATE_PASSWORD,
  payload,
});

export const setUserLoadingStatus = (
  payload: UserState['status'],
): SetUserLoadingStatusActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});

export const setUserData = (
  payload: UserState['user'],
): SetUserDataByIdActionInterface => ({
  type: UserActionsType.SET_USER_DATA_BY_ID,
  payload,
});

export const setCurrentUserData = (
  payload: UserState['user'],
): SetUserDataActionInterface => ({
  type: UserActionsType.SET_USER_DATA,
  payload,
});

export const setUserResponse = (
  payload: UserState['response'],
): SetUserResponseActionInterface => ({
  type: UserActionsType.SET_USER_RESPONSE,
  payload,
});

export type UserActions =
  | SetUserDataActionInterface
  | SetUserLoadingStatusActionInterface
  | SetUserResponseActionInterface
  | SetUserDataByIdActionInterface;
