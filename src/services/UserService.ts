import { AxiosResponse } from 'axios';
import $api from '../http';
import { UpdateUserData, User } from '../store/ducks/user/contracts/state';

interface Response {
  status: string;
  data: User;
  message: string;
}

interface UpdateEmailData {
  email: string;
}

export default class UserService {
  static route: string = 'users';

  static async getMe(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${UserService.route}/me`);
  }

  static async answers(userId: number): Promise<AxiosResponse<Answer[]>> {
    return $api.get(`/${UserService.route}/${userId}/answers`);
  }

  static async update(
    payload: UpdateUserData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(`/${UserService.route}/update`, payload);
  }

  static async updateEmail(
    payload: UpdateEmailData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${UserService.route}/update-email`,
      payload
    );
  }
}
