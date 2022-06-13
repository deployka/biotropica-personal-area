import { CreateDialogDto } from '../@types/dto/chat/create-dialog.dto';
import { GetOneDialogDto } from '../@types/dto/chat/get-one-dialog.dto';
import { Dialog } from '../@types/entities/Chat';
import { baseApi } from './base-api';

export const chatApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllDialogs: builder.query<Exclude<Dialog, 'messages'>[], void>({
      query: () => ({
        url: '/dialogs',
        method: 'GET',
      }),
    }),

    getDialog: builder.query<Dialog, GetOneDialogDto>({
      query: dto => ({
        url: `/dialogs/${dto.id}`,
        method: 'GET',
      }),
    }),

    createDialog: builder.mutation<Dialog, CreateDialogDto>({
      query: dto => ({
        url: 'dialogs',
        method: 'POST',
        body: dto,
      }),
    }),
  }),
});

export const {
  useGetDialogQuery,
  useGetAllDialogsQuery,
  useCreateDialogMutation,
} = chatApi;

export default chatApi;
