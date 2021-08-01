import classNames from 'classnames';
import React from 'react';
import s from './OuterMessage.module.scss';

interface Props {
  options: any;
}

export const OuterMessage = ({ options }: Props) => {
  return (
    <div className={s.message}>
      <div className={s.message__avatar__wrapper}>
        <img src={options.image} className={s.message__avatar}></img>
      </div>
      <div className={s.message__info}>
        <div className={s.message__username}>{options.name}</div>
        <div className={s.message__content}>{options.content}</div>
      </div>
      <div
        className={classNames(s.message__status, {
          [s.new]: options.status,
        })}
      ></div>
    </div>
  );
};
