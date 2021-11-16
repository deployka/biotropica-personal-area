import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  CreateAnalyzeAnswerData,
  UpdateAnalyzeAnswerData,
  AnalyzeAnswer,
  Analyze,
} from '../store/ducks/analyze/contracts/state';

interface Response {
  status: string;
  data: AnalyzeAnswer[];
}

export default class AnalyzeService {
  static route: string = 'analyzes';

  static async getOne(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${AnalyzeService.route}/${payload}`);
  }

  static async geAll(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(
      `/${AnalyzeService.route}/answers?limit=${payload}`
    );
  }

  static async geAllTypes(): Promise<AxiosResponse<Analyze[]>> {
    return await $api.get<Analyze[]>(`/${AnalyzeService.route}/`);
  }

  static async create(
    payload: CreateAnalyzeAnswerData
  ): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(
      `/${AnalyzeService.route}/answer`,
      payload
    );
  }

  static async update(
    payload: UpdateAnalyzeAnswerData
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
