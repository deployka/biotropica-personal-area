import React from 'react';

import classNames from 'classnames';
import closeIcon from './../../assets/icons/close_white.svg';
import editIcon from './../../assets/icons/edit_note.svg';

import s from './Header.module.scss';

interface Props {
  mode: 'edit' | 'view';
  title?: string;
  icon?: string;
  category?: string;
  type?: string;
  onClose(): void;
  onEditBtnClick(): void;
}

export const Header = ({
  mode,
  title,
  icon,
  type,
  category,
  onClose,
  onEditBtnClick,
}: Props) => {
  let taskType = '';
  let headerColor = '';

  switch (type) {
    case 'training':
      taskType = 'Тренировка';
      headerColor = '#3B82F6';
      break;
    case 'competition':
      taskType = 'Соревнование';
      headerColor = '#F6963B';
      break;
    case 'event':
      taskType = 'Событие';
      headerColor = '#00CCB3';
      break;

    default:
      break;
  }

  function onCloseClick() {
    onClose();
  }

  function onEditClick() {
    onEditBtnClick();
  }

  return (
    <div className={s.header} style={{ backgroundColor: headerColor }}>
      <div className={classNames(s.title, mode === 'view' ? s.underline : '')}>
        <div className={s.taskTitle}>
          {icon && mode === 'view' && (
            <div className={s.icon}>
              <div
                className={s.iconMask}
                style={{
                  backgroundColor: headerColor,
                  WebkitMaskImage: `url(images/icons/taskType/${icon}.svg)`,
                  maskImage: `url(images/icons/taskType/${icon}.svg)`,
                }}
              ></div>
            </div>
          )}

          {mode === 'edit' ? 'Редактирование задачи' : title}
        </div>
        <img
          className={s.closeIcon}
          src={closeIcon}
          alt=""
          onClick={onCloseClick}
        />
      </div>

      {mode === 'view' ? (
        <div className={s.taskInfo}>
          <div className={s.row}>
            <p className={s.rowTitle}>тип задачи</p>
            <p className={s.rowText}>{taskType}</p>
          </div>
          {category && (
            <div className={s.row}>
              <p className={s.rowTitle}>категория</p>
              <p className={s.rowText}>{category}</p>
            </div>
          )}
          <img
            className={s.editIcon}
            src={editIcon}
            alt=""
            onClick={onEditClick}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
