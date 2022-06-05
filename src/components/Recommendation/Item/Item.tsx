import React, { useState } from 'react';
import s from './Item.module.scss';

import AnimateHeight from 'react-animate-height';

import moreIcon from './../../../assets/icons/more.svg';

export type RecommendationItemProps = {
  title: string;
  text: string; // HTML
  createdAt: Date;
  editable: boolean;
  onDelete(): void;
  onEdit(): void;
};

type ActionSelectProps = {
  onDelete(): void;
  onEdit(): void;
  onClose(): void;
};

const ActionSelect = ({ onDelete, onEdit, onClose }: ActionSelectProps) => {
  return (
    <>
      <div className={s.background} onClick={onClose}></div>
      <div className={s.actionSelect}>
        <div
          className={s.action}
          onClick={() => {
            onEdit();
            onClose();
          }}
        >
          Редактировать
        </div>
        <div
          className={`${s.action} ${s.red}`}
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Удалить
        </div>
      </div>
    </>
  );
};

export function RecommendationItem({
  title,
  text,
  createdAt,
  editable,
  onDelete,
  onEdit,
}: RecommendationItemProps) {
  const [height, setHeight] = useState<string | number>(0);

  const [isActionSelectOpen, setIsActionSelectOpen] = useState<boolean>(false);

  function onClick() {
    setHeight(height ? 0 : 'auto');
  }

  return (
    <div className={s.recommendationItem}>
      <div className={s.title}>
        {title}{' '}
        {editable && (
          <img
            src={moreIcon}
            onClick={() => {
              setIsActionSelectOpen(!isActionSelectOpen);
            }}
          />
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
      {isActionSelectOpen && (
        <ActionSelect
          onDelete={onDelete}
          onEdit={onEdit}
          onClose={() => {
            setIsActionSelectOpen(false);
          }}
        />
      )}
    </div>
  );
}
