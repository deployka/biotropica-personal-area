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
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Analyze' as const,
                id,
              })),
              { type: 'Analyze', id: 'LIST' },
            ]
          : [{ type: 'Analyze', id: 'LIST' }],
    }),
    createAnalyzeAnswer: builder.mutation<
      Analyze[],
      { text: string; filePath: string }
    >({
      query: dto => ({
        url: '/analyzes/answer',
        method: 'POST',
        body: { ...dto, analyzeId: 1 },
      }),
      invalidatesTags: ['Analyze'],
    }),
    deleteAnalyzeAnswer: builder.mutation<void, DeleteAnalyzeAnswerDto>({
      query: dto => ({
        url: `/analyzes/delete/${dto.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Analyze'],
    }),
    createAnalyzeAnswerComment: builder.mutation<
      Comment,
      CreateAnalyzeAnswerCommentDto
    >({
      query: dto => ({
        url: '/analyzes/answer-comment',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Analyze'],
    }),
    deleteAnalyzeAnswerComment: builder.mutation<
      void,
      DeleteAnalyzeAnswerCommentDto
    >({
      query: dto => ({
        url: `/analyzes/answer-comment/${dto.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Analyze'],
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
