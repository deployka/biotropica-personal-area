import { baseApi } from './base-api';
import { CreateSubscribersDto } from '../@types/dto/subscribers/create-subscriber.dto';
import {
  ResponseSubscribers,
  UpdateSubscribersDto,
} from '../@types/dto/subscribers/update-subscriber.dto';
import { Subscribe } from '../@types/entities/Subscribe';

const subscribersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    currentUserSubscribers: builder.mutation<ResponseSubscribers, void>({
      query: () => ({
        url: '/subscribers',
        method: 'GET',
      }),
    }),
    subscribersByUserId: builder.mutation<ResponseSubscribers, number>({
      // guys... its get request, not mutation
      query: id => ({
        url: `/subscribers/${id}`,
        method: 'GET',
      }),
    }),

    subscribersByUserIdCorrected: builder.query<Subscribe[], number>({
      query: id => ({
        url: `/subscribers/${id}`,
        method: 'GET',
      }),
    }),

    createSubscribers: builder.mutation<Subscribe, CreateSubscribersDto>({
      query: dto => ({
        method: 'POST',
        url: '/subscribers',
        body: dto,
      }),
    }),

    updateSubscribById: builder.mutation<Subscribe, UpdateSubscribersDto>({
      query(dto) {
        return {
          method: 'POST',
          url: `/subscribers/${dto.id}`,
          body: { status: dto.status },
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    removeSubscribById: builder.mutation<Subscribe, number>({
      query(id) {
        return {
          method: 'DELETE',
          url: `/subscribers/${id}`,
        };
      },
    }),
  }),
});

export const {
  useCreateSubscribersMutation,
  useCurrentUserSubscribersMutation,
  useRemoveSubscribByIdMutation,
  useUpdateSubscribByIdMutation,
  useSubscribersByUserIdMutation,
  useSubscribersByUserIdCorrectedQuery,
} = subscribersApi;

export default subscribersApi;
