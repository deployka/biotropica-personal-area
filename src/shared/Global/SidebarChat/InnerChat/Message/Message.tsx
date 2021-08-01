import classNames from 'classnames';
import React from 'react';
import s from './Message.module.scss';

interface Props {
  options: any;
}
function returnMsg({ options }: Props) {
  switch (options.type) {
    case 'document':
      return <div className={s.message__document__wrapper}></div>;
    case 'image':
      return <div className={s.message__image__wrapper}></div>;
    case 'text':
      return <div className={s.message__text__wrapper}></div>;
    case 'typing':
      return <div className={s.message__typing__wrapper}></div>;
  }
}
const message = '';
export const Message = ({ options }: Props) => {
  return <div className={s.message}>{returnMsg(options)}</div>;
};
