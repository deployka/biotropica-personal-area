import { ISelect } from '../../../../shared/Form/Select/SelectCustom';
import { LoadingStatus, Response } from '../../../types';

export interface User {
  id: number;
  email: string;
  password: string;
  profilePhoto: string;
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
  currentUser: User | undefined;
  status: LoadingStatus;
  response: Response | undefined;
}

export interface SignupData {
  email: string;
  password: string;
  verificationPassword: string;
  name: string;
  lastname: string;
  phone: string;
}

export interface SigninData {
  email: string;
  password: string;
}
export interface UpdateEmailData {
  email: string;
}

export interface UpdateUserData extends Partial<Omit<User, 'profilePhoto'>> {
  profilePhoto: File | null | string;
}

export interface ForgotPasswordData {
  email: string;
}
export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  verificationPassword: string;
}

export interface RestorePasswordData {
  password: string;
  verificationPassword: string;
  restoreToken: string;
}
