import { AxiosResponse } from 'axios';
import $api from '../http';

export type IFile = {
  id: number;
  originalName: string;
  name: string;
  type: string;
  size: number;
}

export default class FileService {
  static route: string = 'files';

  static async upload(file: File): Promise<AxiosResponse<IFile>> {
    const formData = new FormData();
    formData.append("file", file);
    return $api.post(`/${FileService.route}/upload-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

}
