import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  CreateConsultationData,
  Consultation,
} from '../store/ducks/consultation/contracts/state';

interface Response {
  status: string;
  data: Consultation | Consultation[];
}

export default class ConsultationService {
  static route: string = 'consultations';

  static async getOne(payload: number): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${ConsultationService.route}/${payload}`);
  }

  static async getClosest(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${ConsultationService.route}/closest`);
  }

  static async geAll(): Promise<AxiosResponse<Response>> {
    return await $api.get<Response>(`/${ConsultationService.route}/`);
  }

  static async create(
    payload: CreateConsultationData
  ): Promise<AxiosResponse<Response>> {
    return await $api.post<Response>(`/${ConsultationService.route}/`, payload);
  }
}
