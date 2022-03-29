import React from 'react';
import {
  CreateSomeTask,
  SomeTask,
} from '../../store/@types/Task';
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
  task:
    | SomeTask
    | CreateSomeTask
    | null;
  mode: 'edit' | 'view';
  isOpened: boolean;
  onClose(): void;
  onEditBtnClick(): void;
  onDelete(): void;
  onSave(
    task: CreateSomeTask
  ): void;
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: number): void;
  onSaveFirstValue(value: number | undefined): void;
  onSaveSecondValue(value: number | undefined): void;
};

export const TasksModal = ({
  task,
  mode,
  isOpened,
  onClose,
  onSave,
  onDelete,
  onEditBtnClick,
  onSendComment,
  onSaveFirstValue,
  onSaveSecondValue,
  onSaveFactValue,
}: TasksModalProps) => {
  let category = '';
  let title = '';
  let icon;

  if (task?.type) {
    switch (task.type) {
      case 'training':
        title = translatedKindOfSport[task.kindOfSport];
        category = translatedCategories[task.category];
        icon = typeGroups[task.type].taskTypeGroup.find(taskType => taskType.key === task.kindOfSport)?.icon;
        break;
      case 'event':
        title = translatedKindOfEvent[task.kindOfEvent];
        icon = typeGroups[task.type].taskTypeGroup.find(taskType => taskType.key === task.kindOfEvent)?.icon;
        break;
      case 'competition':
        title = translatedKindOfCompetitionSport[task.kindOfSport];
        category = getTranslatedCompetitionType(
          task.kindOfSport,
          task.competitionType,
        );
        icon = typeGroups[task.type].taskTypeGroup.find(taskType => taskType.key === task.kindOfSport)?.icon;
        break;
      default:
        break;
    }
  }

  return (
    <BaseTaskEditor
      task={task}
      title={title}
      icon={icon}
      category={category}
      mode={mode}
      isOpened={isOpened}
      onClose={onClose}
      onEditBtnClick={onEditBtnClick}
    >
      <TaskLayout
        task={task}
        mode={mode}
        onSave={onSave}
        onClose={onClose}
        onDelete={onDelete}
        onSendComment={onSendComment}
        onSaveFactValue={onSaveFactValue}
        onSaveFirstValue={onSaveFirstValue}
        onSaveSecondValue={onSaveSecondValue}
      />
    </BaseTaskEditor>
  );
};
