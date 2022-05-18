import React from 'react';
import { CreateSomeTask, SomeTask } from '../../store/@types/Task';

import { TaskEditor } from './TaskEditor';
import { TaskPreview } from './TaskPreview';

type TaskLayoutProps = {
  task: SomeTask | CreateSomeTask | null;
  mode: 'edit' | 'view';
  isLoading: boolean;
  onClose(): void;
  onSave(task: CreateSomeTask): void;
  onSaveAsTemplate(task: Partial<CreateSomeTask>): void;
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
  onSaveAsTemplate,
  isLoading,
  onSendComment,
  onSaveFirstValue,
  onSaveSecondValue,
  onSaveFactValue,
}: TaskLayoutProps) {
  console.log(123);

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
      task={task}
      isLoading={isLoading}
      onSave={onSave}
      onSaveAsTemplate={onSaveAsTemplate}
      onClose={onClose}
    />
  );
}
