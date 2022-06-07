import { FileState, setUserAvatar } from '../store/slices/avatar';
import { baseApi } from './base-api';

export const avatarApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestAvatar: builder.query<FileState['data'], { id: number | null }>({
      query: payload => ({
        url: `/files/${payload.id}`,
        method: 'GET',
      }),
      providesTags: ['Avatar'],
    }),

    requestAddAvatar: builder.mutation<void, FormData>({
      query: payload => ({
        url: '/files/upload-file',
        data: payload,
        method: 'POST',
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

    requestAvatarFile: builder.query<void, string>({
      query: payload => ({
        url: `/static/${payload}`,
        method: 'GET',
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
