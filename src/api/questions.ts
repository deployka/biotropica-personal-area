import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../http/axiosBaseQuery';

type CurrentQuestion = {
  question: Question;
  index: number;
  total: number;
};

export type CreateAnswerDto = {
  text: string;
  questionKey: string;
};

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: axiosBaseQuery,
  endpoints(builder) {
    return {
      getQuestionsList: builder.query<void, void>({
        query() {
          return {
            method: 'get',
            url: 'questions',
          };
        },
      }),
      getQuestions: builder.query<Question, number>({
        query(id) {
          return {
            method: 'get',
            url: `questions/${id}`,
          };
        },
      }),
      getCurrentQuestion: builder.query<CurrentQuestion, void>({
        query() {
          return {
            method: 'get',
            url: 'questions/current',
          };
        },
      }),
      createAnswer: builder.mutation<void, CreateAnswerDto>({
        query(answer) {
          return {
            method: 'post',
            url: 'questions/answer',
            data: answer,
          };
        },
      }),
    };
  },
});

export const {
  useGetCurrentQuestionQuery,
  useGetQuestionsQuery,
  useCreateAnswerMutation,
  useGetQuestionsListQuery,
} = questionsApi;
