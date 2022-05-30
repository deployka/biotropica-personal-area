import React from 'react';
import { TaskTemplate } from '../../store/@types/Task';
import { TemplateElement } from './TemplateElement';

import s from './TaskTemplateGroup.module.scss';

export interface TaskTypeGroupModel {
  title: string;
  color: string;
  taskTemplateGroup: TaskTemplate[];
}

interface TaskTypeGroupProps {
  group: TaskTypeGroupModel;
  onSelect(type: TaskTemplate): void;
  onChangeTemplateName(templateId: string, value: string): void;
}

export const TaskTemplateGroup = ({
  group,
  onSelect,
  onChangeTemplateName,
}: TaskTypeGroupProps) => {
  const { title, color, taskTemplateGroup } = group;
  return (
    <div className={s.taskGroup}>
      <div className={s.title} style={{ color }}>
        {title}
      </div>
      <div className={s.typesList}>
        {taskTemplateGroup.map(type => (
          <div key={type.icon} className={s.typeWrapper}>
            <TemplateElement
              iconColor={color}
              taskType={type}
              onChangeTemplateName={onChangeTemplateName}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};