import { CreateAnswerDto } from '../@types/dto/questionnaire/create-answer.dto';
import { CurrentQuestion, Question } from '../@types/entities/Question';
import { baseApi } from './base-api';

export const questionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getQuestionsList: builder.query<void, void>({
      query() {
        return {
          method: 'GET',
          url: 'questions',
        };
      },
    }),
    getQuestions: builder.query<Question, number>({
      query(id) {
        return {
          method: 'GET',
          url: `questions/${id}`,
        };
      },
    }),
    getCurrentQuestion: builder.query<CurrentQuestion, void>({
      query() {
        return {
          method: 'GET',
          url: 'questions/current',
        };
      },
    }),
    createAnswer: builder.mutation<void, CreateAnswerDto>({
      query(answer) {
        return {
          method: 'POST',
          url: 'questions/answer',
          body: answer,
        };
      },
    }),
  }),
});

export const {
  useGetCurrentQuestionQuery,
  useGetQuestionsQuery,
  useCreateAnswerMutation,
  useGetQuestionsListQuery,
} = questionsApi;
