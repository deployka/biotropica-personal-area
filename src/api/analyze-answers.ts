import { CreateAnalyzeAnswerCommentDto } from '../@types/dto/analyzes/create-comment.dto';
import { CreateAnalyzeAnswerDto } from '../@types/dto/analyzes/create.dto';
import { DeleteAnalyzeAnswerCommentDto } from '../@types/dto/analyzes/delete-comment.dto';
import { DeleteAnalyzeAnswerDto } from '../@types/dto/analyzes/delete.dto';
import { GetAnalyzeAnswersDto } from '../@types/dto/analyzes/getAll';
import { Analyze } from '../@types/entities/Analyze';
import { AnalyzeAnswer } from '../@types/entities/AnalyzeAnswer';
import { baseApi } from './base-api';

export const analyzeAnswersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAnalyzeAnswers: builder.query<AnalyzeAnswer[], GetAnalyzeAnswersDto>({
      query: dto => ({
        url: `/analyze/answers/${dto.userId}`,
        method: 'GET',
      }),
    }),
    createAnalyzeAnswer: builder.mutation<Analyze[], CreateAnalyzeAnswerDto>({
      query: dto => ({
        url: '/analyze/answer',
        method: 'POST',
        data: dto,
      }),
    }),
    deleteAnalyzeAnswer: builder.mutation<void, DeleteAnalyzeAnswerDto>({
      query: id => ({
        url: `/analyze/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    createAnalyzeAnswerComment: builder.mutation<
      Comment,
      CreateAnalyzeAnswerCommentDto
    >({
      query: dto => ({
        url: '/analyze/answer-comment',
        method: 'POST',
        data: dto,
      }),
    }),
    deleteAnalyzeAnswerComment: builder.mutation<
      void,
      DeleteAnalyzeAnswerCommentDto
    >({
      query: id => ({
        url: `/analyze/answer-comment/${id}`,
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
