import s from "./ChatFooter.module.scss";
import React, {useState} from "react";
import {GlobalSvgSelector} from "../../../../../assets/icons/global/GlobalSvgSelector";
import {Message, MessageType} from "../../../../../services/ChatService";
import FileService from "../../../../../services/FileService";
import {ChatFooterAttachPopup} from "./ChatFooterAttachPopup";

type Props = {
    onSubmit: (payload: Pick<Message, 'type' | 'text' | 'fileId'>) => void
    onFocus: () => void
    onBlur: () => void
}

export function ChatFooter({onSubmit, onFocus, onBlur}: Props) {
    const [message, setMessage] = useState<string>('');
    const [popup, setPopup] = useState<boolean>(false);

    async function onSubmitHandler(event: any) {
        if(!message) {
            return
        }
        onSubmit({
            text: message,
            type: MessageType.TEXT
        })
        setMessage('');
        event.preventDefault();
    }

    async function onImageLoadedHandler(file: File) {
        const {data} = await FileService.upload(file)
        setPopup(false)
        return onSubmit({
            fileId: data.id,
            type: MessageType.IMAGE
        })
    }

    async function onDocumentLoadedHandler(file: File) {
        const {data} = await FileService.upload(file)
        setPopup(false)
        return onSubmit({
            fileId: data.id,
            type: MessageType.DOCUMENT
        })
    }

    return <form action="#" className={s.chat__footer__form} onSubmit={onSubmitHandler}>
        {popup ?
            <ChatFooterAttachPopup
                onClickOutside={() => setPopup(false)}
                onImageLoaded={onImageLoadedHandler}
                onDocumentLoaded={onDocumentLoadedHandler}
            /> : ''}

        <div className={s.form__text__wrapper}>
            <textarea
                rows={10}
                className={s.form__text}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {/*<div className={s.form__smile__btn}>*/}
            {/*    <div className={s.form__submit__btn__img}>*/}
            {/*        <GlobalSvgSelector id="smile"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={s.form__attach__btn} onClick={() => setPopup(true)}>
                <div className={s.form__submit__btn__img}>
                    <GlobalSvgSelector id="attach"/>
                </div>
            </div>
        </div>
        <button type="submit" className={s.form__submit__btn}>
            <div className={s.form__submit__btn__img}>
                <GlobalSvgSelector id="send"/>
            </div>
        </button>
    </form>
}
