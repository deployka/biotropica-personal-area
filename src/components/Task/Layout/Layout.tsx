import React from 'react';
import { CreateSomeTask, SomeTask } from '../../../@types/entities/Task';
import { TaskEditor } from '../../TaskEditor/Editor';
import { TaskPreview } from '../../TaskPreview/Preview';

type TaskLayoutProps = {
  task: SomeTask | CreateSomeTask | null;
  mode: 'edit' | 'view';
  isLoading: boolean;
  isSpecialist: boolean;
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
  isSpecialist,
  onSave,
  onSaveAsTemplate,
  isLoading,
  onSendComment,
  onSaveFirstValue,
  onSaveSecondValue,
  onSaveFactValue,
}: TaskLayoutProps) {
  if (!task) return <></>;
  if (mode === 'view' && 'id' in task) {
    return (
      <TaskPreview
        isSpecialist={isSpecialist}
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
