import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  CreateProgressData,
  Progress,
  UpdateProgressData,
} from '../store/ducks/progress/contracts/state';

interface Response {
  status: string;
  data: Progress | Progress[];
}

export default class ProgressService {
  static route: string = 'progress';

  static async getOne(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${ProgressService.route}/${payload}`);
  }

  static async getAll(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${ProgressService.route}/`);
  }

  static async create(
    payload: CreateProgressData
  ): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(`/${ProgressService.route}/`, payload);
  }

  static async update(
    payload: UpdateProgressData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${ProgressService.route}/update/${payload.id}`,
      payload
    );
  }
}
