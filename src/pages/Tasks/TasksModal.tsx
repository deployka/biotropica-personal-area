import React, { useRef } from 'react';
import { CreateSomeTask, SomeTask } from '../../store/@types/Task';
import { BaseTaskEditor } from '../../components/BaseTaskEditor/BaseTaskEditor';
import {
  getTranslatedCompetitionType,
  translatedKindOfCompetitionSport,
} from '../../components/CompetitionTaskEditor/CompetitionTaskEditorConstants';
import { translatedKindOfEvent } from '../../components/EventTaskEditor/EventTaskEditorConstants';
import { typeGroups } from '../../components/TaskTypeSelectModal/TaskTypeSelectModal';
import {
  translatedCategories,
  translatedKindOfSport,
} from '../../components/TrainingTaskEditor/TraningTaskEditorConstants';
import { TaskLayout } from './TaskLayout';
import { FormikProps } from 'formik';

type TasksModalProps = {
  task: SomeTask | CreateSomeTask | null;
  mode: 'edit' | 'view';
  isSpecialist: boolean;
  isOpened: boolean;
  isLoading: boolean;
  taskId: string;
  currentUserId: number;
  onClose(): void;
  onEditBtnClick(): void;
  onDeleteTask(): void;
  onSaveAsTemplate: (task: Partial<CreateSomeTask>) => void;
  onSave(task: CreateSomeTask): void;
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: number): void;
  onSaveFirstValue(value: number | undefined): void;
  onSaveSecondValue(value: number | undefined): void;
};

export const TasksModal = ({
  task,
  taskId,
  mode,
  isSpecialist,
  isOpened,
  currentUserId,
  isLoading,
  onClose,
  onSave,
  onSaveAsTemplate,
  onDeleteTask,
  onEditBtnClick,
  onSendComment,
  onSaveFirstValue,
  onSaveSecondValue,
  onSaveFactValue,
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
    <BaseTaskEditor
      isCurrentUser={task?.authorId === currentUserId}
      task={task}
      taskId={taskId}
      title={title}
      icon={icon}
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
        onSaveAsTemplate={onSaveAsTemplate}
        onSendComment={onSendComment}
        onSaveFactValue={onSaveFactValue}
        onSaveFirstValue={onSaveFirstValue}
        onSaveSecondValue={onSaveSecondValue}
      />
    </BaseTaskEditor>
  );
};
