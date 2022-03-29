import { baseApi } from './baseApi';

import { Avatar } from '../types/avatar';

import { setUserAvatar } from '../slices/avatar';

export const avatarApi = baseApi.injectEndpoints({

  endpoints: builder => ({
    requestAvatar: builder.query<Avatar['data'], { id: number | null }>({
      query: payload => ({
        url: `/files/${payload.id}`,
        method: 'get',
      }),
      providesTags: ['Avatar'],
    }),

    requestAddAvatar: builder.mutation<any, any>({
      query: payload => ({
        url: '/files/upload-file',
        data: payload,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserAvatar(data));
        } catch {}
      },
    }),

    requestAvatarFile: builder.query<any, string>({
      query: payload => ({
        url: `/static/${payload}`,
        method: 'get',
        responseType: 'arraybuffer',
      }),
    }),
  }),
});

export const {
  useRequestAvatarQuery,
  useRequestAddAvatarMutation,
  useRequestAvatarFileQuery,
} = avatarApi;

export default avatarApi;
