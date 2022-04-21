import { ChatSvgSelector } from '../../../../../assets/icons/chat/ChatSvgSelector';
import React from 'react';
import { Message } from '../../../../../services/ChatService';

type Props = {
    read: boolean;
    itIsCurrentUser: boolean;
    message: Message;
}

export function MessageDeliveryStatus(props: Props) {
  const readSentIcon = props.message.id
    ? <ChatSvgSelector id="sent"/>
    : null;
  const readIcon = props.read
    ? <ChatSvgSelector id="read"/>
    : null;
  return props.itIsCurrentUser
    ? readIcon || readSentIcon
    : null;
}
