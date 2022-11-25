import React from 'react';
import { TaskTemplate } from '../../../@types/entities/Task';
import { TemplateElement } from './TemplateElement';

import s from './TemplateGroup.module.scss';

export interface TaskTypeGroupModel {
  title: string;
  color: string;
  taskTemplateGroup: TaskTemplate[];
}

interface TaskTypeGroupProps {
  group: TaskTypeGroupModel;
  onSelect(type: TaskTemplate): void;
  onDeleteTemplate: (templateId: string) => void;
  onChangeTemplateName(templateId: string, value: string): void;
}

export const TaskTemplateGroup = ({
  group,
  onSelect,
  onDeleteTemplate,
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
              iconColor={type.color || color}
              taskType={type}
              onDeleteTemplate={() => onDeleteTemplate(type.id)}
              onChangeTemplateName={onChangeTemplateName}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
