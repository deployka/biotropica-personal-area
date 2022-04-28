import React from 'react';

import { TypeElement } from './TypeElement';

import s from './TaskTypeGroup.module.scss';
import { TaskTemplate, TaskType } from '../../store/@types/Task';

export interface TaskTypeGroupModel {
  title: string;
  color: string;
  taskTypeGroup: TaskType[];
}

export interface TaskTemplateGroupModel {
  title: string;
  color: string;
  taskTemplateGroup: TaskTemplate[];
}

interface TaskTypeGroupProps {
  group: TaskTypeGroupModel;
  onSelect(type: TaskType): void;
}

export const TaskTypeGroup = ({ group, onSelect }: TaskTypeGroupProps) => {
  const { title, color, taskTypeGroup } = group;
  return (
    <div className={s.taskGroup}>
      <div className={s.title} style={{ color }}>
        {title}
      </div>
      <div className={s.typesList}>
        {taskTypeGroup.map(type => (
          <div key={type.key} className={s.typeWrapper}>
            <TypeElement
              iconColor={color}
              taskType={type}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
