import React, { useEffect, useState } from 'react';
import s from './InnerChat.module.scss';
import { Message } from './Message/Message';
import { PrintedMessage } from './Message/PrintedMessage';
import { ChatFooter } from './ChatFooter/ChatFooter';
import { ChatHeader } from './ChatHeader/ChatHeader';
import {
  Message as IMessage,
  MessageType,
} from '../../../../services/ChatService';
import { chatWsService, WSEvent } from '../../../../services/ChatWSService';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../../../store/ducks/user/selectors';
import { User } from '../../../../store/ducks/user/contracts/state';
import { v4 as uuidv4 } from 'uuid';
import { selectDialog } from '../../../../store/ducks/chat/selectors';
import {
  addMessage,
  updateMessage,
} from '../../../../store/ducks/chat/actionCreators';
import { Timemark } from './Message/Timemark';
import {getOpponent} from "../../../../utils/dialogHelper";

interface Props {
  options: any;
  onClose: () => void;
  id: number;
}

export const InnerChat = ({ options, onClose, id }: Props) => {
  const [opponentWriting, setOpponentWriting] = useState<boolean>(false);
  const [opponentReadAt, setOpponentReadAt] = useState<string>('');
  const selectedDialog = useSelector(selectDialog);
  const user = useSelector(selectUserData) as User;

  const messages = selectedDialog?.messages || [];
  const dispatch = useDispatch();

  function dispatchAddMessage(newMessage: IMessage) {
    dispatch(addMessage(selectedDialog!.id, newMessage));
  }

  function dispatchUpdateMessage(newMessage: IMessage) {
    dispatch(updateMessage(selectedDialog!.id, newMessage));
  }

  function handleOnMessageReceived(e: MessageEvent) {
    try {
      const newMessage = JSON.parse(e.data);
      switch (newMessage.type) {
        case MessageType.DOCUMENT:
        case MessageType.TEXT:
        case MessageType.IMAGE: {
          return dispatchAddMessage(newMessage);
        }
        case 'received': {
          return dispatchUpdateMessage(newMessage);
        }
        case 'writing': {
          return setOpponentWriting(newMessage.action === 'start');
        }
        case 'reading': {
          return setOpponentReadAt(newMessage.readAt);
        }
      }
    } catch (e) {}
  }

  useEffect(() => {
    chatWsService.openDialog(selectedDialog!.id);
    if (!opponentReadAt) {
      setOpponentReadAt(selectedDialog!.opponentReading.readAt);
    }
    return () => chatWsService.closeDialog();
  }, [selectedDialog]);

  useEffect(() => {
    chatWsService.addEventListener(
      WSEvent.onMessageReceived,
      handleOnMessageReceived
    );
    return () =>
      chatWsService.removeEventListener(
        WSEvent.onMessageReceived,
        handleOnMessageReceived
      );
  }, []);

  useEffect(() => {
    const InnerChatEl = document.getElementById('InnerChat');
    if (!InnerChatEl) {
      return;
    }
    InnerChatEl.scrollTo({ top: InnerChatEl.scrollHeight, behavior: 'smooth' });
  }, [messages, opponentWriting]);

  function sendMessage(msg: {
    type: MessageType;
    text?: string;
    fileId?: number;
  }) {
    const message = {
      ...msg,
      authorId: user.id,
      dialogId: selectedDialog!.id,
      uuid: uuidv4(),
    };
    dispatchAddMessage({
      ...message,
      createdAt: new Date().toISOString(),
      id: 0,
      updatedAt: '',
    });
    chatWsService.sendMessage(message);
  }

  function sendWritingsStart() {
    chatWsService.startWritings(selectedDialog!.id);
  }

  function sendWritingsStop() {
    chatWsService.stopWritings(selectedDialog!.id);
  }

  const list: (
    | {
        type: 'timemark';
        patload: string;
      }
    | {
        type: 'message';
        read: boolean;
        payload: IMessage;
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
      read: msg.createdAt < opponentReadAt,
      payload: msg,
    });

    lastTime = currentTime;
  }

  const List = list.map(item => {
    switch (item.type) {
      case 'message':
        return (
          <Message
            message={item.payload}
            currentUser={user}
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

  return selectedDialog ? (
    <div className={s.inner__chat}>
      <ChatHeader user={getOpponent(selectedDialog, user) as User} onClose={onClose} />
      <div className={s.messages} id="InnerChat">
        {List}
        {opponentWriting ? <PrintedMessage /> : ''}
      </div>
      <ChatFooter
        onSubmit={sendMessage}
        onFocus={sendWritingsStart}
        onBlur={sendWritingsStop}
      />
    </div>
  ) : (
    <div />
  );
};
