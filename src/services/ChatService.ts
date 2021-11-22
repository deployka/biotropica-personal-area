import { AxiosResponse } from 'axios';
import $api from '../http';
import { IFile } from './FileService';

type DateTime = string;

export type Reading = {
  id: number;
  userId: number;
  dialogId: number;
  readAt: DateTime;
};

export type Dialog = {
  id: number;
  createdAt: DateTime;
  participants: User[];
  messages: Message[];
  opponentReading: Reading;
};

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}

export type Message = {
  authorId: number;
  createdAt: DateTime;
  dialogId: number;
  id: number;
  text?: string;
  updatedAt: DateTime;
  uuid: string;
  fileId?: number;
  file?: IFile;
  type: MessageType;
};

export default class ChatService {
  static route: string = 'dialogs';

  static async getAll(): Promise<AxiosResponse<Exclude<Dialog, 'messages'>[]>> {
    return await $api.get(`/${ChatService.route}`);
  }

  static async getDialog(id: number): Promise<AxiosResponse<Dialog>> {
    return await $api.get(`/${ChatService.route}/${id}`);
  }

  static async createDialog(userId: number): Promise<AxiosResponse<Dialog>> {
    return await $api.post(`/${ChatService.route}/`, { userId });
  }
}
