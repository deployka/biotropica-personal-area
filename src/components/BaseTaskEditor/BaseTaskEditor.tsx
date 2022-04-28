import classNames from 'classnames';
import { FormikProps } from 'formik';
import React, { ReactNode, RefObject } from 'react';
import {
  CreateCompetitionTask,
  CreateEventTask,
  CreateSomeTask,
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
  onDeleteTask(): void;
  onSaveAsTemplate: (task: Partial<CreateSomeTask>) => void;
  onClose(): void;
  taskId: string;
  onEditBtnClick(): void;
  formikRef: RefObject<FormikProps<Partial<CreateSomeTask>>>;
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
  formikRef,
  taskId,
  onDeleteTask,
  onSaveAsTemplate,
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
          taskId={taskId}
          mode={mode}
          formikRef={formikRef}
          title={title}
          icon={icon}
          category={category}
          type={task?.type}
          onDeleteTask={onDeleteTask}
          onSaveAsTemplate={onSaveAsTemplate}
          onClose={onClose}
          onEditBtnClick={onEditBtnClick}
        />
        <div className={s.body}>{children}</div>
      </div>
    </>
  );
}
