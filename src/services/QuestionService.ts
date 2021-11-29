import { AxiosResponse } from 'axios';
import $api from '../http';

export default class QuestionService {
    static route: string = 'questions';

    static async getCurrentQuestion(): Promise<AxiosResponse<{
        question: Question;
        index: number;
        total: number;
    }>> {
        return $api.get(`/${QuestionService.route}/current`);
    }

    static async answer(answer: CreateAnswerDto): Promise<AxiosResponse<Answer>> {
        return $api.post(`/${QuestionService.route}/answer`, answer);
    }

    static async getOne(payload: number): Promise<AxiosResponse<Response>> {
        return await $api.get<Response>(`/${QuestionService.route}/${payload}`);
    }

    static async geAll(): Promise<AxiosResponse<Response>> {
        return await $api.get<Response>(`/${QuestionService.route}/`);
    }

}
