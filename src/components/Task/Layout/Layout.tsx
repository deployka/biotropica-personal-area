import React from 'react';
import { CreateSomeTask, SomeTask } from '../../../@types/entities/Task';
import { TaskEditor } from '../../TaskEditor/Editor';
import { TaskPreview } from '../../TaskPreview/Preview';

type TaskLayoutProps = {
  task: SomeTask | CreateSomeTask | null;
  mode: 'edit' | 'view' | 'create';
  isLoading: boolean;
  isSpecialist: boolean;
  isDoneButtonClick: boolean;
  onClose(): void;
  onSave(task: CreateSomeTask): void;
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: string): void;
  onSaveFirstValue(value: string | undefined): void;
  onSaveSecondValue(value: string | undefined): void;
  onDeleteComment(commentId: string): void;
};

export function TaskLayout({
  task,
  mode,
  onClose,
  isSpecialist,
  onSave,
  isLoading,
  isDoneButtonClick,
  onSendComment,
  onSaveFirstValue,
  onSaveSecondValue,
  onSaveFactValue,
  onDeleteComment,
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
        onDeleteComment={onDeleteComment}
        isDoneButtonClick={isDoneButtonClick}
      />
    );
  }
  return (
    <TaskEditor
      task={task}
      isLoading={isLoading}
      onSave={onSave}
      onClose={onClose}
    />
  );
}
