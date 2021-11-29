import { ISelect } from '../../../../shared/Form/Select/SelectCustom';
import { LoadingStatus } from '../../../types';

export interface User {
  id: number;
  email: string;
  password: string;
  profile_photo: string;
  name: string;
  lastname: string;
  patronymic: string;
  dob: Date;
  phone: string;
  gender: ISelect<string>[];
  paid: boolean;
  isOnline: boolean;
  banned: boolean;
  banReason: string;
  confirmed: boolean;
  refreshToken: string;
}

export interface UserState {
  user: User | undefined;
  status: LoadingStatus;
  response: any;
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

export interface UpdateUserData extends Partial<Omit<User, 'profile_photo'>> {
  profile_photo: File | null | string;
}

export interface ForgotPasswordData {
  email: string;
}
export interface ChangePasswordData {
  current_password: string;
  password: string;
  verification_password: string;
}

export interface RestorePasswordData {
  password: string;
  verification_password: string;
  restoreToken: string;
}
