import React from 'react';
import { CreateSomeTask, SomeTask } from '../../../@types/entities/Task';

import {
  getTranslatedCompetitionType,
  translatedKindOfCompetitionSport,
} from '../../TaskEditor/Competition/CompetitionConstants';
import { translatedKindOfEvent } from '../../TaskEditor/Event/EventConstants';

import { TaskBaseEditor } from '../../../components/Task/BaseEditor/BaseEditor';
import { TaskLayout } from '../../../components/Task/Layout/Layout';
import {
  translatedCategories,
  translatedKindOfSport,
} from '../../TaskEditor/Training/TrainingConstants';
import { typeGroups } from '../TypeSelectModal/taskTypeConstants';
import { getUserRolesList } from '../../../utils/getUserRolesList';

type TasksModalProps = {
  task: SomeTask | CreateSomeTask | null;
  mode: 'edit' | 'view' | 'create';
  isAdmin: boolean;
  isSpecialist: boolean;
  isOpened: boolean;
  isLoading: boolean;
  taskId: string;
  currentUserId: number;
  isCommentsLoading?: boolean;
  onClose(): void;
  onEditBtnClick(): void;
  onCreateTemplate(): void;
  onDeleteTask(): void;
  onSave(task: CreateSomeTask): void;
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: string): void;
  onSaveFirstValue(value: string | undefined): void;
  onSaveSecondValue(value: string | undefined): void;
  onDeleteComment(commentId: string): void;
};

export const TasksModal = ({
  task,
  taskId,
  mode,
  isSpecialist,
  isOpened,
  currentUserId,
  isCommentsLoading,
  isLoading,
  isAdmin,
  onCreateTemplate,
  onClose,
  onSave,
  onDeleteTask,
  onEditBtnClick,
  onSendComment,
  onSaveFirstValue,
  onSaveSecondValue,
  onSaveFactValue,
  onDeleteComment,
}: TasksModalProps) => {
  let category = '';
  let title = '';
  let icon: string | undefined;

  if (task?.type) {
    switch (task.type) {
      case 'training':
        title = translatedKindOfSport[task.kindOfSport];
        category = translatedCategories[task.category];
        icon = typeGroups[task.type].taskTypeGroup.find(
          taskType => taskType.key === task.kindOfSport,
        )?.icon;
        break;
      case 'event':
        title = translatedKindOfEvent[task.kindOfEvent];
        icon = typeGroups[task.type].taskTypeGroup.find(
          taskType => taskType.key === task.kindOfEvent,
        )?.icon;
        break;
      case 'competition':
        title = translatedKindOfCompetitionSport[task.kindOfSport];
        category = getTranslatedCompetitionType(
          task.kindOfSport,
          task.competitionType,
        );
        icon = typeGroups[task.type].taskTypeGroup.find(
          taskType => taskType.key === task.kindOfSport,
        )?.icon;
        break;
      default:
        break;
    }
  }

  return (
    <TaskBaseEditor
      isCurrentUser={task?.authorId === currentUserId}
      isSpecialist={isSpecialist}
      isAdmin={isAdmin}
      task={task}
      taskId={taskId}
      title={title}
      icon={icon}
      authorName={task?.authorName || ''}
      authorSpecialistId={task?.authorSpecialistId}
      onCreateTemplate={onCreateTemplate}
      onDeleteTask={onDeleteTask}
      category={category}
      mode={mode}
      isOpened={isOpened}
      onClose={onClose}
      onEditBtnClick={onEditBtnClick}
    >
      <TaskLayout
        isSpecialist={isSpecialist}
        task={task}
        mode={mode}
        isLoading={isLoading}
        onSave={onSave}
        onClose={onClose}
        onSendComment={onSendComment}
        onSaveFactValue={onSaveFactValue}
        onSaveFirstValue={onSaveFirstValue}
        onSaveSecondValue={onSaveSecondValue}
        isCommentsLoading={isCommentsLoading}
        onDeleteComment={onDeleteComment}
      />
    </TaskBaseEditor>
  );
};
