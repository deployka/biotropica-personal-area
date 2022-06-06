import { CreateCommentDto } from '../@types/dto/analyzes/create-comment.dto';
import { CreateAnalyzeDto } from '../@types/dto/analyzes/create.dto';
import { DeleteCommentDto } from '../@types/dto/analyzes/delete-comment.dto';
import { DeleteAnalyzeDto } from '../@types/dto/analyzes/delete.dto';
import { Analyze } from '../@types/entities/Analyze';
import { baseApi } from './base-api';

export const analyzeAnswersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAnalyzeAnswer: builder.mutation<Analyze[], CreateAnalyzeDto>({
      query: dto => ({
        url: '/analyze/answer',
        method: 'POST',
        data: dto,
      }),
    }),
    deleteAnalyzeAnswer: builder.mutation<void, DeleteAnalyzeDto>({
      query: id => ({
        url: `/analyze/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    createAnalyzeAnswerComment: builder.mutation<Comment, CreateCommentDto>({
      query: dto => ({
        url: '/analyze/answer-comment',
        method: 'POST',
        data: dto,
      }),
    }),
    deleteAnalyzeAnswerComment: builder.mutation<void, DeleteCommentDto>({
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
} = analyzeAnswersApi;

export default analyzeAnswersApi;
