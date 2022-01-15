import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  CreateGoalData,
  Goal,
  UpdateGoalData,
} from '../store/ducks/goal/contracts/state';

interface Response {
  status: string;
  data: Goal | Goal[];
}

export default class GoalService {
  static route = 'goals';

  static async getOne(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${GoalService.route}/${payload}`);
  }

  static async geAll(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${GoalService.route}/`);
  }

  static async create(payload: CreateGoalData): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(`/${GoalService.route}/`, payload);
  }

  static async update(payload: UpdateGoalData): Promise<AxiosResponse<Response>> {
    return await $api.patch<Response>(
      `/${GoalService.route}/update/${payload.id}`,
      payload
    );
  }

  static async delete(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.delete<Response>(`/${GoalService.route}/delete/${payload}`);
  }
}
