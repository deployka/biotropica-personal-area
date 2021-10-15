import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  CreateAnalyzeData,
  Analyze,
  UpdateAnalyzeData,
} from '../store/ducks/analyzes/contracts/state';

interface Response {
  status: string;
  data: Analyze | Analyze[];
}

export default class AnalyzeService {
  static route: string = 'analyzes';

  static async getOne(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${AnalyzeService.route}/${payload}`);
  }

  static async geAll(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${AnalyzeService.route}/`);
  }

  static async create(
    payload: CreateAnalyzeData
  ): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(`/${AnalyzeService.route}/`, payload);
  }

  static async update(
    payload: UpdateAnalyzeData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${AnalyzeService.route}/update/${payload.id}`,
      payload
    );
  }

  static async delete(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.delete<Response>(
      `/${AnalyzeService.route}/delete/${payload}`
    );
  }
}
