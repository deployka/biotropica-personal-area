import React from 'react';
import { AppModule } from './AppModule';

export type ChatProps = {
    token: string;
    activeDialogId?: number;
    onClose(): void;
};

export function Chat(props: ChatProps) {
  if (!process.env.REACT_APP_CHAT_FRONT_URL) {
    throw new Error('Добавьте REACT_APP_CHAT_FRONT_URL в .env');
  }
  return <AppModule
    url={process.env.REACT_APP_CHAT_FRONT_URL as string}
    params={{
      token: props.token,
      activeDialogId: props.activeDialogId?.toString() || '',
    }}
    events={{
      onClose: props.onClose,
    }}
  />;
}
