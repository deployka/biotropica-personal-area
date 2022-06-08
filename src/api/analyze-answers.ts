import { CreateAnalyzeAnswerCommentDto } from '../@types/dto/analyzes/create-comment.dto';
import { CreateAnalyzeAnswerDto } from '../@types/dto/analyzes/create.dto';
import { DeleteAnalyzeAnswerCommentDto } from '../@types/dto/analyzes/delete-comment.dto';
import { DeleteAnalyzeAnswerDto } from '../@types/dto/analyzes/delete.dto';
import { GetAnalyzeAnswersDto } from '../@types/dto/analyzes/get-all.dto';
import { Analyze } from '../@types/entities/Analyze';
import { AnalyzeAnswer } from '../@types/entities/AnalyzeAnswer';
import { baseApi } from './base-api';

export const analyzeAnswersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAnalyzeAnswers: builder.query<AnalyzeAnswer[], GetAnalyzeAnswersDto>({
      query: dto => ({
        url: `/analyzes/answers/${dto.userId}`,
        method: 'GET',
      }),
    }),
    createAnalyzeAnswer: builder.mutation<Analyze[], CreateAnalyzeAnswerDto>({
      query: dto => ({
        url: '/analyzes/answer',
        method: 'POST',
        body: dto,
      }),
    }),
    deleteAnalyzeAnswer: builder.mutation<void, DeleteAnalyzeAnswerDto>({
      query: id => ({
        url: `/analyzes/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    createAnalyzeAnswerComment: builder.mutation<
      Comment,
      CreateAnalyzeAnswerCommentDto
    >({
      query: dto => ({
        url: '/analyzes/answer-comment',
        method: 'POST',
        data: dto,
      }),
    }),
    deleteAnalyzeAnswerComment: builder.mutation<
      void,
      DeleteAnalyzeAnswerCommentDto
    >({
      query: id => ({
        url: `/analyzes/answer-comment/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateAnalyzeAnswerCommentMutation,
  useCreateAnalyzeAnswerMutation,
  useDeleteAnalyzeAnswerCommentMutation,
  useDeleteAnalyzeAnswerMutation,
  useGetAnalyzeAnswersQuery,
} = analyzeAnswersApi;

export default analyzeAnswersApi;
