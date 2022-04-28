import classNames from 'classnames';
import React, { ReactNode } from 'react';
import {
  CreateCompetitionTask,
  CreateEventTask,
  CreateTrainingTask,
} from '../../store/@types/Task';

import s from './BaseTaskEditor.module.scss';
import { Header } from './Header';

export type BaseTaskEditorProps = {
  task: CreateTrainingTask | CreateEventTask | CreateCompetitionTask | null;
  title?: string;
  icon?: string;
  mode: 'edit' | 'view';
  category?: string;
  children: ReactNode;
  isOpened: boolean;
  onClose(): void;
  onEditBtnClick(): void;
};

export function BaseTaskEditor({
  task,
  mode,
  icon,
  title,
  children,
  category,
  isOpened,
  onClose,
  onEditBtnClick,
}: BaseTaskEditorProps) {
  return (
    <>
      <div
        className={classNames(s.background, !isOpened ? s.hidden : '')}
        onClick={onClose}
      ></div>
      <div className={classNames(s.editorWrapper, !isOpened ? s.hidden : '')}>
        <Header
          mode={mode}
          title={title}
          icon={icon}
          category={category}
          type={task?.type}
          onClose={onClose}
          onEditBtnClick={onEditBtnClick}
        />
        <div className={s.body}>{children}</div>
      </div>
    </>
  );
}
