import React from 'react';
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

type TasksModalProps = {
  task: SomeTask | CreateSomeTask | null;
  mode: 'edit' | 'view';
  isOpened: boolean;
  isLoading: boolean;
  taskId: string;
  onClose(): void;
  onEditBtnClick(): void;
  onDeleteTask(): void;
  onSaveAsTemplate: () => void;
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
  isOpened,
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
      task={task}
      taskId={taskId}
      title={title}
      icon={icon}
      onDeleteTask={onDeleteTask}
      onSaveAsTemplate={onSaveAsTemplate}
      category={category}
      mode={mode}
      isOpened={isOpened}
      onClose={onClose}
      onEditBtnClick={onEditBtnClick}
    >
      <TaskLayout
        task={task}
        mode={mode}
        isLoading={isLoading}
        onSave={onSave}
        onClose={onClose}
        onSendComment={onSendComment}
        onSaveFactValue={onSaveFactValue}
        onSaveFirstValue={onSaveFirstValue}
        onSaveSecondValue={onSaveSecondValue}
      />
    </BaseTaskEditor>
  );
};
