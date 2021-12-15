import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  CreateRecommendationData,
  Recommendation,
  UpdateRecommendationData,
} from '../store/ducks/recommendation/contracts/state';

interface Response {
  status: string;
  data: Recommendation | Recommendation[];
}

export default class RecommendationService {
  static route: string = 'recommendations';

  static async getOne(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(
      `/${RecommendationService.route}/${payload}`
    );
  }

  static async geAll(id: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${RecommendationService.route}/${id}`);
  }

  static async create(
    payload: CreateRecommendationData
  ): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(
      `/${RecommendationService.route}/`,
      payload
    );
  }

  static async update(
    payload: UpdateRecommendationData
  ): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${RecommendationService.route}/update/${payload.id}`,
      payload
    );
  }

  static async delete(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.delete<Response>(
      `/${RecommendationService.route}/delete/${payload}`
    );
  }
}
