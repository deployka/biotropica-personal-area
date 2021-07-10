import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse } from '../models/AuthResponse';

export default class AuthService {
  static async signin(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/signin', { email, password });
  }

  static async signup(
    email: string,
    name: string,
    lastname: string,
    phone: string,
    password: string,
    verification_password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/signup', {
      email,
      password,
      verification_password,
      name,
      lastname,
      phone,
    });
  }

  static async signout(): Promise<void> {
    return await $api.get('/signout');
  }
}
