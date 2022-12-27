import { CreateAnswerDto } from '../@types/dto/questionnaire/create-answer.dto';
import { CurrentQuestion, Question } from '../@types/entities/Question';
import { baseApi } from './base-api';

export const questionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getQuestionsList: builder.query<Question[], void>({
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
      providesTags: ['CurrentQuestion'],
    }),
    createAnswer: builder.mutation<void, CreateAnswerDto>({
      query(answer) {
        return {
          method: 'POST',
          url: 'questions/answer',
          body: answer,
        };
      },
      invalidatesTags: ['QuestionnaireAnswers', 'CurrentQuestion'],
    }),
    reset: builder.mutation<void, void>({
      query() {
        return {
          method: 'DELETE',
          url: 'questions/reset',
        };
      },
      invalidatesTags: ['QuestionnaireAnswers', 'CurrentQuestion'],
    }),
  }),
});

export const {
  useGetCurrentQuestionQuery,
  useGetQuestionsQuery,
  useCreateAnswerMutation,
  useGetQuestionsListQuery,
  useResetMutation,
} = questionsApi;
