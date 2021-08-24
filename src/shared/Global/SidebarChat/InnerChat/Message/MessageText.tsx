import classNames from "classnames";
import s from "./Message.module.scss";
import React from "react";
import {MessageTime} from "./MessageTime";
import { Message } from "../../../../../services/ChatService";
import {MessageDeliveryStatus} from "./MessageDeliveryStatus";

type Props = {
    read: boolean;
    itIsCurrentUser: boolean;
    message: Message;
}

export function MessageText(props: Props) {
    return <div className={classNames(
        s.message,
        s.message__type__text,
        props.itIsCurrentUser ? s.by__user : ''
    )}>
        {props.message.text}
        <div className={classNames(s.message__time, s.message__time__text)}>
            <MessageTime time={props.message.createdAt}/>
            <MessageDeliveryStatus
                message={props.message}
                read={props.read}
                itIsCurrentUser={props.itIsCurrentUser}
            />
        </div>
    </div>
}
