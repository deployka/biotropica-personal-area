import React from 'react';
import s from './Message.module.scss';
import classNames from "classnames";
import {Message as IMessage, MessageType} from "../../../../../services/ChatService";
import format from 'date-fns/format';
import {ChatSvgSelector} from "../../../../../assets/icons/chat/ChatSvgSelector";
import {GlobalSvgSelector} from "../../../../../assets/icons/global/GlobalSvgSelector";
import {getMediaLink} from "../../../../../utils/mediaHelper";
import {MessageText} from "./MessageText";

interface Props {
    message: IMessage;
    currentUser: ChatUser;
    read: boolean;
}


function returnMsg(message: IMessage, currentUser: ChatUser, read: boolean) {
    const time = format(new Date(message.createdAt), 'HH:mm')
    const itIsCurrentUser = currentUser.id === message.authorId;
    const readSentIcon = message.id ? <ChatSvgSelector id="sent"/> : ''
    const readIcon = read ? <ChatSvgSelector id="read"/> : ''

    switch (message.type) {
        case MessageType.DOCUMENT:
            if(!message.file) {
                return '';
            }
            const size = Math.round(message.file.size / 100000)/10;
            const extension = message.file.type.toUpperCase();

            return <div
                    className={classNames(
                        s.message,
                        s.message__type__document,
                        s.by__user
                    )}
                >
                    <a
                        className={s.message__type__document__top}
                        href={getMediaLink(message.file.name)}
                        download
                        target="_blank"
                    >
                        <div className={s.document__img__wrapper}>
                            <div className={s.document__img}>
                                <GlobalSvgSelector id="document"/>
                            </div>
                        </div>
                        <div className={s.document__name}>{message.file.originalName}</div>
                    </a>
                    <div className={s.message__type__document__bot}>
                        <div className={s.document__size}>
                            {size} <span className={s.document__size__units}>MB</span>
                        </div>
                        <div className={s.document__extension}>{extension}</div>
                        <div
                            className={classNames(s.message__time, s.message__time__document)}
                        >
                            <span>{time}</span>
                            {itIsCurrentUser ? readIcon || readSentIcon : ''}
                        </div>
                    </div>
                </div>;
        case MessageType.IMAGE:
            return message.file?.name ? <img
                    src={getMediaLink(message.file.name)}
                    className={classNames(
                        s.message,
                        s.message__type__image,
                        s.new__branch,
                        itIsCurrentUser ? s.by__user : ''
                    )}
                /> : 'XXXXXX';
        case MessageType.TEXT:
            return <MessageText
                itIsCurrentUser={itIsCurrentUser}
                read={read}
                message={message}
            />
    }
}

export const Message = ({message, currentUser, read}: Props) => {
    return <>{returnMsg(message, currentUser, read)}</>
};
