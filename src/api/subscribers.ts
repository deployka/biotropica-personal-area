import { baseApi } from './base-api';
import { CreateSubscribersDto } from '../@types/dto/subscribers/create-subscriber.dto';
import { UpdateSubscribersDto } from '../@types/dto/subscribers/update-subscriber.dto';
import { Subscribe } from '../@types/entities/Subscribe';

const subscribersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    currentUserSubscribers: builder.query<Subscribe[], void>({
      query: () => ({
        url: '/subscribers',
        method: 'GET',
      }),
    }),
    subscribersByUserId: builder.query<Subscribe[], number>({
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
  useCurrentUserSubscribersQuery,
  useRemoveSubscribByIdMutation,
  useUpdateSubscribByIdMutation,
  useSubscribersByUserIdQuery,
} = subscribersApi;

export default subscribersApi;
