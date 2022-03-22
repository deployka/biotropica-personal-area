import React, { Suspense } from 'react';

const ChatApp: React.FC<{
  isOpened: boolean;
  isAuth: boolean;
  token: string;
  currentUser: ChatUser;
  isUnread: boolean;
  activeDialogId?: number;

  onClose(): void;
  onChangeReading(isUnread: boolean): void;
  // eslint-disable-next-line
  // @ts-ignore
}> = React.lazy(() => import('biotropika-chat/Chat'));

export type ChatProps = {
  token: string;
  currentUser: ChatUser;
  activeDialogId?: number;
  onClose(): void;
};

export function Chat(props: ChatProps) {
  if (!process.env.REACT_APP_CHAT_FRONT_URL) {
    throw new Error('Добавьте REACT_APP_CHAT_FRONT_URL в .env');
  }
  return (
    <Suspense fallback={'loading...'}>
      <ChatApp
        isOpened={true}
        isAuth={true}
        isUnread={false}
        token={props.token}
        activeDialogId={props.activeDialogId}
        currentUser={props.currentUser}
        onClose={props.onClose}
        onChangeReading={() => null}
      />
    </Suspense>
  );
}
