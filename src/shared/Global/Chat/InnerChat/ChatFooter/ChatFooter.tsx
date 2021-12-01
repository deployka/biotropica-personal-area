import React, { RefObject, useState } from 'react';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { Message, MessageType } from '../../../../../services/ChatService';
import FileService from '../../../../../services/FileService';
import { ChatFooterAttachPopup } from './ChatFooterAttachPopup';
import { Textarea } from './Textarea';

import s from './ChatFooter.module.scss';

type Props = {
  onSubmit: (payload: Pick<Message, 'type' | 'text' | 'fileId'>) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function ChatFooter({ onSubmit, onFocus, onBlur }: Props) {
  const [message, setMessage] = useState<string>('');
  const [popup, setPopup] = useState<boolean>(false);

  const refBtn = React.createRef() as RefObject<HTMLDivElement>;

  async function onSubmitHandler(event: any) {
    if (!message) {
      return;
    }
    onSubmit({
      text: message,
      type: MessageType.TEXT,
    });
    setMessage('');
    event.preventDefault();
  }

  async function onImageLoadedHandler(file: File) {
    const { data } = await FileService.upload(file);
    setPopup(false);
    return onSubmit({
      fileId: data.id,
      type: MessageType.IMAGE,
    });
  }

  async function onDocumentLoadedHandler(file: File) {
    const { data } = await FileService.upload(file);
    setPopup(false);
    return onSubmit({
      fileId: data.id,
      type: MessageType.DOCUMENT,
    });
  }

  return (
    <form action="#" className={s.footer} onSubmit={onSubmitHandler}>
      <div className={s.wrapper}>
        <Textarea
          value={message}
          minRows={1}
          maxRows={4}
          placeholder="Напишите сообщение"
          onChange={setMessage}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {/*<div className={s.form__smile__btn}>*/}
        {/*    <div className={s.form__submit__btn__img}>*/}
        {/*        <GlobalSvgSelector id="smile"/>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div
          ref={refBtn}
          className={s.attachBtn}
          onClick={() => setPopup(true)}
        >
          <GlobalSvgSelector id="attach" />
        </div>
      </div>

      {popup ? (
        <ChatFooterAttachPopup
          onClickOutside={() => setPopup(false)}
          onImageLoaded={onImageLoadedHandler}
          onDocumentLoaded={onDocumentLoadedHandler}
        />
      ) : (
        ''
      )}

      <button className={s.submitBtn} type="submit">
        <div className={s.form__submit__btn__img}>
          <GlobalSvgSelector id="send" />
        </div>
      </button>
    </form>
  );
}
