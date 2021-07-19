import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse } from '../models/AuthResponse';
import {
  ChangePasswordData,
  ErrorsData,
  ForgotPasswordData,
  RestorePasswordData,
  SigninData,
  SignupData,
} from '../store/ducks/user/contracts/state';

interface Response {
  status: string;
  data: AuthResponse;
  errors: ErrorsData;
}

interface ResponseRefresh {
  accessToken: string;
  refreshToken: string;
}

export default class AuthService {
  static route: string = 'auth';

  static async signin(data: SigninData): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(`/${AuthService.route}/signin`, data);
  }

  static async signup(data: SignupData): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(`/${AuthService.route}/signup`, data);
  }

  static async refresh(): Promise<AxiosResponse<ResponseRefresh>> {
    return await $api.get<ResponseRefresh>(`/${AuthService.route}/refresh`);
  }

  static async signout(): Promise<void> {
    window.localStorage.removeItem('token');
    return await $api.get(`/${AuthService.route}/signout`);
  }

  static async changePassword(data: ChangePasswordData): Promise<void> {
    return await $api.patch(`/${AuthService.route}/change-password`, data);
  }

  static async forgotPassword(data: ForgotPasswordData): Promise<void> {
    return await $api.post(`/${AuthService.route}/forgot-password`, data);
  }

  static async restorePassword(data: RestorePasswordData): Promise<void> {
    return await $api.post(`/${AuthService.route}/restore-password`, data, {
      headers: { authorization: `Bearer ${data.restoreToken}` },
    });
  }
}
