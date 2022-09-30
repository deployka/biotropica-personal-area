import { UploadFilesDto } from '../@types/dto/files/upload-files.dto';
import { UploadFileDto } from '../@types/dto/files/upload.dto';
import { File } from '../@types/entities/File';
import { baseApi } from './base-api';

export const filesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation<File, UploadFileDto>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/files/upload-file',
          method: 'POST',
          body: formData,
        };
      },
    }),

    uploadFiles: builder.mutation<File[], UploadFilesDto>({
      query: ({ files }) => {
        const formData = new FormData();
        files.forEach(file => {
          formData.append('files', file);
        });
        formData.append('files', JSON.stringify(files));
        return {
          url: '/files/upload-files',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation, useUploadFilesMutation } = filesApi;

export default filesApi;
