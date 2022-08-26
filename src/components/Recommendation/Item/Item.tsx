import React, { useState } from 'react';
import s from './Item.module.scss';

import AnimateHeight from 'react-animate-height';

import moreIcon from './../../../assets/icons/dots-horizontal.svg';
import { Action, ActionMenu } from '../../UI/ActionsMenu/ActionsMenu';
import classNames from 'classnames';

export type RecommendationItemProps = {
  title: string;
  text: string; // HTML
  createdAt: Date;
  isEditable: boolean;
  onDelete(): void;
  onEdit(): void;
};

export function RecommendationItem({
  title,
  text,
  createdAt,
  isEditable,
  onDelete,
  onEdit,
}: RecommendationItemProps) {
  const [height, setHeight] = useState<string | number>(0);

  const [isActionSelectOpen, setIsActionSelectOpen] = useState<boolean>(false);

  const onClick = () => {
    setHeight(height ? 0 : 'auto');
  };

  const actions: Action[] = [
    {
      title: 'Редактировать',
      onClick: onEdit,
    },
    {
      title: 'Удалить',
      onClick: onDelete,
      type: 'red',
    },
  ];

  return (
    <div className={s.recommendationItem}>
      <div className={s.title}>
        {title}
        {isEditable && (
          <ActionMenu
            isOpened={isActionSelectOpen}
            actions={actions}
            onClose={() => {
              setIsActionSelectOpen(false);
            }}
          >
            <div
              className={classNames(s.moreBtn, {
                [s.active]: isActionSelectOpen,
              })}
            >
              <img
                src={moreIcon}
                onClick={() => {
                  setIsActionSelectOpen(!isActionSelectOpen);
                }}
              />
            </div>
          </ActionMenu>
        )}
      </div>
      <AnimateHeight height={height}>
        <div
          className={s.text}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </AnimateHeight>
      <div className={s.footer}>
        <div className={s.date}>
          Добавлено {createdAt.toLocaleDateString('ru-RU')}
        </div>
        <div className={s.showBtn} onClick={onClick}>
          {height === 0 ? 'Показать' : 'Скрыть'}
        </div>
      </div>
    </div>
  );
}
