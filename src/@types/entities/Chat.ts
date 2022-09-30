import { BaseEntity } from './BaseEntity';
import { BaseUser } from './BaseUser';
import { File } from './File';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}

export type Reading = BaseEntity & {
  userId: number;
  dialogId: number;
  readAt: DateTimeString;
};

export type Dialog = BaseEntity & {
  participants: BaseUser[];
  messages: Message[];
  title: string;
  opponentReading: Reading;
};

export type Message = BaseEntity & {
  authorId: number;
  dialogId: number;
  text?: string;
  uuid: string;
  fileId?: number;
  file?: File;
  type: MessageType;
};
