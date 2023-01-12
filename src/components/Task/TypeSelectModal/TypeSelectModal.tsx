import React, { useState } from 'react';

import { TaskTypeGroup, TaskTemplateGroupModel } from './TypeGroup';

import s from './TypeSelectModal.module.scss';

import closeIcon from './../../../assets/icons/close.svg';
import classNames from 'classnames';
import {
  SomeTask,
  Task,
  TaskTemplate,
  TaskType,
} from '../../../@types/entities/Task';

import { Tabs } from '../../Tabs/Tabs';
import { TaskTemplateGroup } from './TemplateGroup';
import { typeGroups } from './taskTypeConstants';

export type TaskTypeSelectModalProps = {
  isOpened: boolean;
  isClient: boolean;
  templates: SomeTask[];
  onClose(): void;
  onSelect(type: TaskType | TaskTemplate): void;
  onDeleteTemplate: (templateId: string) => void;
  onChangeTemplateName(templateId: string, value: string): void;
};

export function TaskTypeSelectModal({
  isOpened,
  isClient,
  templates,
  onClose,
  onSelect,
  onDeleteTemplate,
  onChangeTemplateName,
}: TaskTypeSelectModalProps) {
  type TabTypes = 'tasks' | 'templates';

  function formatToTemplateTask(props: SomeTask): TaskTemplate {
    const { type, templateName = '', title, id } = props;
    let icon: string | undefined;

    if (type) {
      switch (type) {
        case 'training':
          icon = typeGroups[type].taskTypeGroup.find(
            taskType => taskType.key === props.kindOfSport,
          )?.icon;
          break;
        case 'event':
          icon = typeGroups[type].taskTypeGroup.find(
            taskType => taskType.key === props.kindOfEvent,
          )?.icon;
          break;
        case 'competition':
          icon = typeGroups[type].taskTypeGroup.find(
            taskType => taskType.key === props.kindOfSport,
          )?.icon;
          break;
        default:
          break;
      }
    }
    return {
      icon: icon || '',
      title,
      templateName,
      id,
      type,
    };
  }

  const templateGroups = templates.reduce((acc, template) => {
    acc[template.type] = {
      color: typeGroups[template.type].color,
      title: typeGroups[template.type].title,
      taskTemplateGroup: templates
        .map(formatToTemplateTask)
        .filter(t => t.type === template.type),
    };
    return acc;
  }, {} as Record<Task['type'], TaskTemplateGroupModel>);

  const options: { label: string; value: TabTypes }[] = [
    {
      value: 'tasks',
      label: 'Задачи',
    },
    {
      value: 'templates',
      label: 'Шаблоны',
    },
  ];

  const [selectedTab, setSelectedTab] = useState<TabTypes>('tasks');

  const onSelectTab = (currentTab: TabTypes) => setSelectedTab(currentTab);
  return (
    <>
      <div
        className={classNames(s.background, isOpened ? '' : s.hidden)}
        onClick={onClose}
      ></div>
      <div className={classNames(s.typeSelectModal, isOpened ? '' : s.hidden)}>
        <div className={s.header}>
          <div className={s.left}>
            <p>Выберите тип задачи</p>
          </div>
          <div className={s.center}>
            {!isClient && (
              <Tabs
                options={options}
                value={selectedTab}
                onSelect={onSelectTab}
              />
            )}
          </div>

          <img className={s.closeBtn} src={closeIcon} onClick={onClose} />
        </div>
        <div className={s.typesGroups}>
          {selectedTab === 'tasks' &&
            Object.entries(typeGroups).map(([key, value]) => (
              <TaskTypeGroup key={key} group={value} onSelect={onSelect} />
            ))}
          {selectedTab === 'templates' && !templates.length && <p className={s.emptyText}>Нет шаблонов</p>}
          {selectedTab === 'templates' &&
            Object.entries(templateGroups).map(([key, value]) => (
              <TaskTemplateGroup
                onDeleteTemplate={onDeleteTemplate}
                onChangeTemplateName={onChangeTemplateName}
                key={key}
                group={value}
                onSelect={onSelect}
              />
            ))}
        </div>
      </div>
    </>
  );
}
