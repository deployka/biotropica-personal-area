import { AxiosResponse } from 'axios';
import $api from '../http';
import { UpdateUserData, User } from '../store/ducks/user/contracts/state';

interface Response {
  status: string;
  data: User;
}

export default class UserService {
  static route: string = 'users';

  static async getMe(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${UserService.route}/me`);
  }

  static async update(payload: FormData): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(`/${UserService.route}/update`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary',
      },
    });
  }
}
