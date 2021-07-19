import { LoadingStatus } from '../../../types';

export interface User {
  id: number;
  email: string;
  password: string;
  profile_photo: string;
  name: string;
  lastname: string;
  patronymic: string;
  dob: string;
  phone: string;
  gender: string;
  before_photos: JSON;
  after_photos: JSON;
  paid: boolean;
  banned: boolean;
  banReason: string;
  confirmed: boolean;
  confirmed_hash: string;
  refreshToken: string;
}

export interface UserState {
  data: User | undefined;
  status: LoadingStatus;
  response: any;
  errors: ErrorsData | undefined;
}

export interface SignupData {
  email: string;
  password: string;
  verification_password: string;
  name: string;
  lastname: string;
  phone: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface ErrorsData {
  message: string;
  statusCode: string;
}

export interface ForgotPasswordData {
  email: string;
}
export interface ChangePasswordData {
  password: string;
  verification_password: string;
}

export interface RestorePasswordData {
  password: string;
  verification_password: string;
  restoreToken?: string;
}
