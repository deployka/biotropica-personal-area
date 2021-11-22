import { AxiosResponse } from 'axios';
import $api from '../http';
import { Specialist } from '../store/ducks/specialist/contracts/state';

interface Response {
  status: string;
  data: Specialist | Specialist[];
}

export default class SpecialistService {
  static route: string = 'specialists';

  static async getOne(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${SpecialistService.route}/${payload}`);
  }

  static async geAll(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${SpecialistService.route}/`);
  }
}
