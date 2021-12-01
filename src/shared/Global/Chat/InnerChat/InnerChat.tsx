import React, { useEffect, useState } from 'react';

import s from './InnerChat.module.scss';

import { Message as MessageComponent } from './Message/Message';
import { ChatFooter } from './ChatFooter/ChatFooter';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { Timemark } from './Message/Timemark';
import { getOpponent } from '../../../../utils/dialogHelper';
import { PrintedMessage } from './Message/PrintedMessage';

interface Props {
  currentUser: ChatUser;
  dialog: Dialog;
  onClose: () => void;

  onSendMessage(msg: Pick<Message, 'type' | 'text' | 'fileId'>): void;

  onStartWritings(): void;

  onFinishWritings(): void;
}

export const InnerChat = ({
  currentUser,
  dialog,
  onClose,
  onSendMessage,
  onStartWritings,
  onFinishWritings,
}: Props) => {
  const messages = dialog.messages || [];

  useEffect(() => {
    const InnerChatEl = document.getElementById('InnerChat');
    if (!InnerChatEl) {
      return;
    }
    InnerChatEl.scrollTo({ top: InnerChatEl.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const list: (
    | {
        type: 'timemark';
        patload: string;
      }
    | {
        type: 'message';
        read: boolean;
        payload: Message;
      }
  )[] = [];

  let lastTime = '';
  for (const msg of messages) {
    const currentTime = (msg.createdAt || '2020-01-01').slice(0, 10);
    if (lastTime && lastTime !== currentTime) {
      list.push({
        type: 'timemark',
        patload: currentTime,
      });
    }

    list.push({
      type: 'message',
      // TODO: XXX
      // read: msg.createdAt < opponentReadAt,
      read: true,
      payload: msg,
    });

    lastTime = currentTime;
  }

  const List = list.map(item => {
    switch (item.type) {
      case 'message':
        return (
          <MessageComponent
            message={item.payload}
            currentUser={currentUser}
            read={item.read}
            key={item.payload.uuid}
          />
        );
      case 'timemark':
        return (
          <Timemark time={item.patload} key={`timemark-${item.patload}`} />
        );
    }
  });

  const opponent = getOpponent(dialog, currentUser);
  if (!opponent) {
    return null;
  }

  return (
    <div className={s.innerChat}>
      <ChatHeader user={opponent} onClose={onClose} />
      <div className={s.messages} id="InnerChat">
        {List}
        {dialog.opponentWriting ? <PrintedMessage /> : ''}
      </div>
      <ChatFooter
        onSubmit={onSendMessage}
        onFocus={onStartWritings}
        onBlur={onFinishWritings}
      />
    </div>
  );
};
