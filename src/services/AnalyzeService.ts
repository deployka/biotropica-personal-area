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
  static route = 'analyzes';

  static async getOne(id: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${AnalyzeService.route}/${id}`);
  }

  static async geAll(
    id: number,
    offset = 0,
    limit = 2
  ): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(
      `/${AnalyzeService.route}/answers/${id}/?offset=${offset}&limit=${limit}`
    );
  }

  static async geAllTypes(): Promise<AxiosResponse<Analyze[]>> {
    return await $api.get<Analyze[]>(`/${AnalyzeService.route}/`);
  }

  static async create(
    data: CreateAnalyzeAnswerData
  ): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(`/${AnalyzeService.route}/answer`, data);
  }

  static async update(
    data: UpdateAnalyzeAnswerData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${AnalyzeService.route}/update/${data.id}`,
      data
    );
  }

  static async delete(id: number): Promise<AxiosResponse<Response>> {
    return await $api.delete<Response>(`/${AnalyzeService.route}/delete/${id}`);
  }
}
