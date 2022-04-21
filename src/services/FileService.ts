import { AxiosResponse } from 'axios';
import $api from '../http';

export type IFile = {
  id: number;
  originalName: string;
  name: string;
  type: string;
  size: number;
};

export default class FileService {
  static route = 'files';

  static async upload(file: File): Promise<AxiosResponse<IFile>> {
    const formData = new FormData();
    formData.append('file', file);
    return $api.post(`/${FileService.route}/upload-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async uploadFiles(files: File[]): Promise<AxiosResponse<IFile[]>> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('files', JSON.stringify(files));
    return $api.post(`/${FileService.route}/upload-files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
