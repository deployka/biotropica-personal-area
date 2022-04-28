import { FormikProps, FormikValues } from 'formik';
import React, { RefObject } from 'react';
import { CreateSomeTask, SomeTask } from '../../store/@types/Task';

import { TaskEditor } from './TaskEditor';
import { TaskPreview } from './TaskPreview';

type TaskLayoutProps = {
  task: SomeTask | CreateSomeTask | null;
  mode: 'edit' | 'view';
  isLoading: boolean;
  onClose(): void;
  formikRef: RefObject<FormikProps<Partial<CreateSomeTask>>>;
  onSave(task: CreateSomeTask): void;
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: number): void;
  onSaveFirstValue(value: number | undefined): void;
  onSaveSecondValue(value: number | undefined): void;
};

export function TaskLayout({
  task,
  mode,
  onClose,
  onSave,
  isLoading,
  onSendComment,
  onSaveFirstValue,
  formikRef,
  onSaveSecondValue,
  onSaveFactValue,
}: TaskLayoutProps) {
  if (!task) return <></>;
  if (mode === 'view' && 'id' in task) {
    return (
      <TaskPreview
        task={task}
        onSendComment={onSendComment}
        onSaveFactValue={onSaveFactValue}
        onSaveFirstValue={onSaveFirstValue}
        onSaveSecondValue={onSaveSecondValue}
      />
    );
  }
  return (
    <TaskEditor
      formikRef={formikRef}
      task={task}
      isLoading={isLoading}
      onSave={onSave}
      onClose={onClose}
    />
  );
}
