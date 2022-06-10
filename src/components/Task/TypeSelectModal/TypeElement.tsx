import React from 'react';
import { TaskType } from '../../../@types/entities/Task';

import s from './TypeElement.module.scss';
interface Props {
  iconColor: string;
  taskType: TaskType;
  onSelect(type: TaskType): void;
}

export function TypeElement({ taskType, iconColor, onSelect }: Props) {
  return (
    <div className={s.taskType} onClick={() => onSelect(taskType)}>
      <div className={s.iconBg} style={{ backgroundColor: iconColor }}>
        <img className={s.icon} src={taskType.icon} />
      </div>
      {taskType.title}
    </div>
  );
}
