import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import s from './Chat.module.scss';

import { InnerChat } from './InnerChat/InnerChat';
import { DialogList } from './DialogList/DialogList';
import { PopupBackground } from '../PopupBackground/PopupBackground';
import { Message } from '../../../services/ChatService';
import { chatWsService, WSEvent } from './services/ChatWSService';
import { v4 as uuidv4 } from 'uuid';
import { chatApi } from './services/chatApi';

interface Props {
  isOpened: boolean;
  isAuth: boolean;
  token: string;
  currentUser: ChatUser;
  isUnread: boolean;

  onClose(): void;
  onChangeReading(isUnread: boolean): void;
}

enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}

export const Chat = (props: Props) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);
  const [selectedDialog, setSelectedDialog] = useState<Dialog | null>(null);
  const [unreadDialogs, setUnreadDialogs] = useState<Dialog['id'][]>([]);

  useEffect(() => {
    const unread = dialogs.reduce((acc, dialog) => {
      const currentUserReading = dialog.dialogReadings.find(r => r.userId === props.currentUser.id);
      if (!currentUserReading) return acc;

      if(dialog.messages.filter(m => m.updatedAt > currentUserReading.readAt).length) {
        acc.push(dialog.id)
      }
      return acc;
    }, [] as number[]);
    setUnreadDialogs(unread);
  }, [dialogs])



  if(!!unreadDialogs.length !== props.isUnread) {
    props.onChangeReading(!!unreadDialogs.length)
  }

  function closeDialog() {
    setSelectedDialog(null);
  }

  function openDialog(dialogId: Dialog['id']) {
    chatApi
      .fetchDialog(dialogId)
      .then((dialog: Dialog) => {
        setSelectedDialog(dialog);
        setUnreadDialogs(unreadDialogs.filter(it => it !== dialog.id))
      });
  }

  useEffect(() => {
    chatApi.setToken(props.token);
  }, [props.token]);

  useEffect(() => {
    if (props.isAuth) {
      chatApi.fetchDialogs().then(setDialogs);
      if (!chatWsService.isOnline) {
        chatWsService.connect();
      }
    } else {
      if (chatWsService.isOnline) {
        chatWsService.disconnect();
      }
    }
  }, [props.isAuth]);

  function dispatchAddMessage(newMessage: Message) {
    const dialogId = newMessage.dialogId;
    const dialog = dialogs.find(it => it.id === dialogId);
    if (dialog) {
      const messages = dialog.messages.slice();
      const messagesIndex = messages.findIndex(
        it => it.uuid === newMessage.uuid
      );
      if (messagesIndex === -1) {
        messages.push(newMessage);
      } else {
        messages.splice(messagesIndex, 1, newMessage);
      }
      const index = dialogs.indexOf(dialog);
      setDialogs(
        dialogs.slice().splice(index, 1, {
          ...dialog,
          messages,
        })
      );
    }

    if (selectedDialog?.id === dialogId) {
      const messages = selectedDialog.messages.slice();
      const index = messages.findIndex(it => it.uuid === newMessage.uuid);
      if (index === -1) {
        messages.push(newMessage);
      } else {
        messages.splice(index, 1, newMessage);
      }

      setSelectedDialog({
        ...selectedDialog,
        messages,
      });
    }
  }

  function dispatchUpdateMessage(newMessage: Message) {
    const dialogId = newMessage.dialogId;
    if (selectedDialog?.id === dialogId) {
      const messages = selectedDialog.messages.slice();
      const index = messages.findIndex(it => it.uuid === newMessage.uuid);
      if (index === -1) {
        return;
      }

      messages.splice(index, 1, newMessage);

      setSelectedDialog({
        ...selectedDialog,
        messages,
      });
    }
  }

  function setOpponentWriting(opponentWriting: boolean) {
    if (selectedDialog) {
      setSelectedDialog({
        ...selectedDialog,
        opponentWriting,
      });
    }
  }

  const [opponentReadAt, setOpponentReadAt] = useState<string>('');

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
    if (!selectedDialog) {
      return;
    }
    chatWsService.openDialog(selectedDialog.id);
    if (!opponentReadAt) {
      setOpponentReadAt(selectedDialog.opponentReading.readAt);
    }
    return () => {
      chatWsService.closeDialog();
    };
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
  }, [selectedDialog]);

  function sendMessage(
    dialog: Dialog,
    msg: {
      type: MessageType;
      text?: string;
      fileId?: number;
    }
  ) {
    if (!selectedDialog) {
      return;
    }
    const message = {
      ...msg,
      authorId: props.currentUser.id,
      dialogId: selectedDialog.id,
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

  function sendWritingsStart(dialog: Dialog) {
    chatWsService.startWritings(dialog.id);
  }

  function sendWritingsStop(dialog: Dialog) {
    chatWsService.stopWritings(dialog.id);
  }

  return (
    <>
      <div onClick={() => props.onClose()}>
        <PopupBackground open={props.isOpened} />
      </div>
      <div
        className={classNames({
          [s.sidebarChat]: true,
          [s.open]: props.isOpened,
        })}
      >
        <div className={s.wrapper}>
          {selectedDialog ? (
            <InnerChat
              dialog={selectedDialog}
              currentUser={props.currentUser}
              onClose={() => closeDialog()}
              onSendMessage={msg => sendMessage(selectedDialog!, msg)}
              onStartWritings={() => sendWritingsStart(selectedDialog!)}
              onFinishWritings={() => sendWritingsStop(selectedDialog!)}
            />
          ) : (
            <DialogList
              dialogs={dialogs}
              unread={unreadDialogs}
              currentUser={props.currentUser}
              onClose={() => props.onClose()}
              onOpenDialog={dialog => openDialog(dialog.id)}
            />
          )}
        </div>
      </div>
    </>
  );
};
