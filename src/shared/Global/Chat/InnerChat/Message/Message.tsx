import React from 'react';
import s from './Message.module.scss';
import classNames from 'classnames';
import {
  Message as IMessage,
  MessageType,
} from '../../../../../services/ChatService';
import format from 'date-fns/format';
import { ChatSvgSelector } from '../../../../../assets/icons/chat/ChatSvgSelector';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import { MessageText } from './MessageText';

interface Props {
  message: IMessage;
  currentUser: ChatUser;
  read: boolean;
}

function returnMsg(message: IMessage, currentUser: ChatUser, read: boolean) {
  const time = format(new Date(message.createdAt), 'HH:mm');
  const itIsCurrentUser = currentUser.id === message.authorId;
  const readSentIcon = message.id ? <ChatSvgSelector id="sent" /> : '';
  const readIcon = read ? <ChatSvgSelector id="read" /> : '';

  switch (message.type) {
    case MessageType.DOCUMENT:
      if (!message.file) {
        return '';
      }
      const size = Math.round(message.file.size / 100000) / 10;
      const extension = message.file.type.toUpperCase();

      return (
        <div className={classNames(s.message, s.documentMessage, s.by__user)}>
          <a
            className={s.top}
            href={getMediaLink(message.file.name)}
            download
            target="_blank"
          >
            <div className={s.icon}>
              <GlobalSvgSelector id="document" />
            </div>

            <div className={s.name}>
              <p>{message.file.originalName}</p>
            </div>
          </a>
          <div className={s.bottom}>
            <div className={s.fileInfo}>
              <div className={s.size}>
                {size} <span className={s.size__units}>MB</span>
              </div>
              <div className={s.dot}>&#8226;</div>
              <div className={s.extension}>{extension}</div>
            </div>
            <div className={classNames(s.time)}>
              <span>{time}</span>
              {itIsCurrentUser ? readIcon || readSentIcon : ''}
            </div>
          </div>
        </div>
      );
    case MessageType.IMAGE:
      return message.file?.name ? (
        <img
          src={getMediaLink(message.file.name)}
          className={classNames(
            s.message,
            s.imageMessage,
            s.new__branch,
            itIsCurrentUser ? s.by__user : ''
          )}
        />
      ) : (
        'XXXXXX'
      );
    case MessageType.TEXT:
      return (
        <MessageText
          itIsCurrentUser={itIsCurrentUser}
          read={read}
          message={message}
        />
      );
  }
}

export const Message = ({ message, currentUser, read }: Props) => {
  return <>{returnMsg(message, currentUser, read)}</>;
};
