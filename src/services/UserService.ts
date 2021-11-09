import { AxiosResponse } from 'axios';
import $api from '../http';
import { UpdateUserFormData, User } from '../store/ducks/user/contracts/state';

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

  static async update(
    payload: UpdateUserFormData
  ): Promise<AxiosResponse<Response>> {
    const formData = new FormData();
    for (let value in payload) {
      if (value === 'email') continue;
      formData.append(value, payload[value]);
    }
    return await $api.patch<Response>(
      `/${UserService.route}/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data; boundary',
        },
      }
    );
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
