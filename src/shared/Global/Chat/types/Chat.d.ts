interface ChatUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  profilePhoto: string;
  isOnline: boolean;
}

type DateTime = string;

interface Dialog {
  id: number;
  createdAt: DateTime;
  title?: string;
  participants: ChatUser[];
  messages: Message[];
  dialogReadings: Reading[];
  opponentReading: Reading;
  opponentWriting?: boolean;
}

interface Reading {
  id: number;
  userId: number;
  dialogId: number;
  readAt: DateTime;
}

enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}

interface Message {
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
}

interface IFile {
  id: number;
  originalName: string;
  name: string;
  type: string;
  size: number;
}
