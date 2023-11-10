import React, { RefObject, useState } from 'react';

import classNames from 'classnames';
import closeIcon from './../../../assets/icons/close_white.svg';
import deleteTask from './../../../assets/icons/taskType/trash.png';
import editIcon from './../../../assets/icons/edit_note.svg';
import MoreIcon from '../../../assets/icons/global/more.svg';
import { useHistory } from 'react-router';

import s from './Header.module.scss';
import { Action, ActionMenu } from '../../UI/ActionsMenu/ActionsMenu';

import { Button } from '../../../shared/Form/Button/Button';

interface Props {
  mode: 'edit' | 'view' | 'create';
  isCurrentUser: boolean;
  isEditable: boolean;
  title?: string;
  icon?: string;
  category?: string;
  type?: string;
  taskId: string;
  isSpecialist: boolean;
  isDoneButtonClick?: boolean;
  authorSpecialistId?: number;
  authorName: string;
  onClose(): void;
  onEditBtnClick(): void;
  onCreateTemplate(): void;
  onDeleteTask(): void;
  onDoneTask?(): void;
}

export const Header = ({
  mode,
  title,
  icon,
  type,
  category,
  isEditable,
  authorSpecialistId,
  authorName,
  isCurrentUser,
  onClose,
  onCreateTemplate,
  onEditBtnClick,
  onDeleteTask,
  isDoneButtonClick,
  onDoneTask,
}: Props) => {
  let taskType = '';
  let headerColor = '';
  let headerTitle = '';

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const history = useHistory();

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

  switch (mode) {
    case 'edit':
      headerTitle = 'Редактирование задачи';
      break;
    case 'view':
      headerTitle = title || '';
      break;

    case 'create':
      headerTitle = 'Создание задачи';
      break;
    default:
      break;
  }

  const actions: Action[] = [
    {
      title: 'Создать шаблон',
      onClick: onCreateTemplate,
    },
    {
      title: 'Удалить задачу',
      onClick: onDeleteTask,
      type: 'red',
    },
  ];

  const onClickAuthor = (id: number) => {
    if (isCurrentUser) {
      return history.push('/profile');
    }

    if (!id) return;

    return history.push(`/specialists/${id}`);
  };

  return (
    <div className={s.header} style={{ backgroundColor: headerColor }}>
      <div className={classNames(s.title, { [s.underline]: mode === 'view' })}>
        <div className={s.taskTitle}>
          {icon && mode === 'view' && (
            <div className={s.icon}>
              <div
                className={s.iconMask}
                style={{
                  backgroundColor: headerColor,
                  WebkitMaskImage: `url(${icon})`,
                  maskImage: `url(${icon})`,
                }}
              ></div>
            </div>
          )}
          {headerTitle}
        </div>

        <div className={s.rightContent}>
          {mode === 'edit' && (
            <ActionMenu
              actions={actions}
              isOpened={isMenuOpened}
              onClose={() => setIsMenuOpened(false)}
            >
              <div
                className={s.actionsMenu}
                onClick={() => setIsMenuOpened(!isMenuOpened)}
              >
                <img src={MoreIcon} />
              </div>
            </ActionMenu>
          )}
          <img className={s.closeIcon} src={closeIcon} onClick={onClose} />
        </div>
      </div>

      {mode === 'view' && (
        <>
          <div className={s.editTaskButtonContainer}>
            <Button
              className={s.editTaskButton}
              onClick={onEditBtnClick}
              options={{
                content: 'Редактировать задачу',
                width: '140px',
                height: '40px',
              }}
            />
            <Button
              className={s.editTaskButton}
              onClick={onDeleteTask}
              options={{
                content: 'Удалить задачу',
                width: '140px',
                height: '40px',
              }}
            />
            <Button
              className={s.editTaskButton}
              onClick={onDoneTask}
              options={{
                content: 'Завершить задачу',
                width: '140px',
                height: '40px',
              }}
            />
          </div>
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
            {/* {isEditable && (
              <img
                className={s.editIcon}
                src={editIcon}
                onClick={onEditBtnClick}
              />
            )} */}
          </div>

          {authorName && (
            <div className={s.authorInfo}>
              <p className={s.title}>Создатель</p>
              <p
                className={s.name}
                onClick={() => {
                  onClickAuthor(authorSpecialistId || 0);
                }}
              >
                {isCurrentUser ? 'Я' : authorName}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
