import React, { useState } from 'react';

import {
  TaskTypeGroupModel,
  TaskTypeGroup,
  TaskTemplateGroupModel,
} from './TaskTypeGroup';

import s from './TaskTypeSelectModal.module.scss';

import closeIcon from './../../assets/icons/close.svg';
import classNames from 'classnames';
import {
  KindOfCompetitionSport,
  KindOfEvent,
  KindOfSport,
  SomeTask,
  Task,
  TaskTemplate,
  TaskType,
} from '../../store/@types/Task';

import bikeIcon from './taskType/bike.svg';
import chairIcon from './taskType/chair.svg';
import dangerIcon from './taskType/danger.svg';
import dumbbellIcon from './taskType/dumbbell.svg';
import elseIcon from './taskType/else.svg';
import femaleIcon from './taskType/female.svg';
import foodIcon from './taskType/food.svg';
import noteIcon from './taskType/note.svg';
import pillIcon from './taskType/pill.svg';
import planeIcon from './taskType/plane.svg';
import rowingIcon from './taskType/rowing.svg';
import runIcon from './taskType/run.svg';
import skiIcon from './taskType/ski.svg';
import swimIcon from './taskType/swim.svg';
import triathlonIcon from './taskType/triathlon.svg';
import videoIcon from './taskType/video.svg';
import virusIcon from './taskType/virus.svg';
import { Tabs } from '../Tabs/Tabs';
import { TaskTemplateGroup } from './TaskTemplateGroup';

export type TaskTypeSelectModalProps = {
  isOpened: boolean;
  onClose(): void;
  isSpecialist: boolean;
  onSelect(type: TaskType | TaskTemplate): void;
  templates: SomeTask[];
  onChangeTemplateName(templateId: string, value: string): void;
};

export const typeGroups: Record<Task['type'], TaskTypeGroupModel> = {
  training: {
    title: 'Тренировка',
    color: '#3B82F6',
    taskTypeGroup: [
      {
        title: 'Бег',
        icon: runIcon,
        type: 'training',
        key: KindOfSport.run,
      },
      {
        title: 'Беговая дорожка',
        icon: runIcon,
        type: 'training',
        key: KindOfSport.treadmill,
      },
      {
        title: 'Велосипед',
        icon: bikeIcon,
        type: 'training',
        key: KindOfSport.bike,
      },
      {
        title: 'Лыжи',
        icon: skiIcon,
        type: 'training',
        key: KindOfSport.skis,
      },
      {
        title: 'Бег по улице',
        icon: runIcon,
        type: 'training',
        key: KindOfSport.streetRun,
      },
      {
        title: 'Плавание',
        icon: swimIcon,
        type: 'training',
        key: KindOfSport.swimming,
      },
      {
        title: 'Велотрек',
        icon: bikeIcon,
        type: 'training',
        key: KindOfSport.bike,
      },
      {
        title: 'Гребля',
        icon: rowingIcon,
        type: 'training',
        key: KindOfSport.rowing,
      },
      {
        title: 'Бег в помещении',
        icon: runIcon,
        type: 'training',
        key: KindOfSport.indoorRun,
      },
      {
        title: 'Плавание на открытой воде',
        icon: swimIcon,
        type: 'training',
        key: KindOfSport.openWaterSwimming,
      },
      {
        title: 'Велостанок',
        icon: bikeIcon,
        type: 'training',
        key: KindOfSport.bikeStation,
      },
      {
        title: 'Гребля тренажёр',
        icon: rowingIcon,
        type: 'training',
        key: KindOfSport.rowingMachine,
      },
      {
        title: 'Бег по пересечённой местности',
        icon: runIcon,
        type: 'training',
        key: KindOfSport.crossCountryRun,
      },
      {
        title: 'Плавание в бассейне',
        icon: swimIcon,
        type: 'training',
        key: KindOfSport.poolSwimming,
      },
      {
        title: 'Силовая тренировка',
        icon: dumbbellIcon,
        type: 'training',
        key: KindOfSport.powerTraining,
      },
      {
        title: 'Прочее',
        icon: elseIcon,
        type: 'training',
        key: KindOfSport.other,
      },
    ],
  },
  event: {
    title: 'Событие',
    color: '#00CCB3',
    taskTypeGroup: [
      {
        title: 'День отдыха',
        icon: chairIcon,
        type: 'event',
        key: KindOfEvent.restDay,
      },
      {
        title: 'Питание',
        icon: foodIcon,
        type: 'event',
        key: KindOfEvent.nutrition,
      },
      {
        title: 'Проблема',
        icon: dangerIcon,
        type: 'event',
        key: KindOfEvent.trouble,
      },
      {
        title: 'Витамины',
        icon: pillIcon,
        type: 'event',
        key: KindOfEvent.vitamins,
      },
      {
        title: 'Болезнь',
        icon: virusIcon,
        type: 'event',
        key: KindOfEvent.illness,
      },
      {
        title: 'Переезд',
        icon: planeIcon,
        type: 'event',
        key: KindOfEvent.relocation,
      },
      {
        title: 'Женский цикл',
        icon: femaleIcon,
        type: 'event',
        key: KindOfEvent.menstruation,
      },
      {
        title: 'Видео',
        icon: videoIcon,
        type: 'event',
        key: KindOfEvent.video,
      },
      {
        title: 'Заметка',
        icon: noteIcon,
        type: 'event',
        key: KindOfEvent.note,
      },
      {
        title: 'Нарушение режима',
        icon: femaleIcon,
        type: 'event',
        key: KindOfEvent.regime,
      },
    ],
  },
  competition: {
    title: 'Соревнование',
    color: '#F6963B',
    taskTypeGroup: [
      {
        title: 'Велосипед',
        icon: bikeIcon,
        type: 'competition',
        key: KindOfCompetitionSport.cycling,
      },
      {
        title: 'Бег',
        icon: runIcon,
        type: 'competition',
        key: KindOfCompetitionSport.run,
      },
      {
        title: 'Триатлон',
        icon: triathlonIcon,
        type: 'competition',
        key: KindOfCompetitionSport.triathlon,
      },
      {
        title: 'Плавание',
        icon: swimIcon,
        type: 'competition',
        key: KindOfCompetitionSport.swimming,
      },
      {
        title: 'Лыжи',
        icon: skiIcon,
        type: 'competition',
        key: KindOfCompetitionSport.skis,
      },
    ],
  },
};

export function TaskTypeSelectModal({
  isOpened,
  onClose,
  onSelect,
  isSpecialist,
  templates,
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

  const [selectedTab, setSelectedTab] = useState<TabTypes>('templates');

  const onSelectTab = (currentTab: TabTypes) => setSelectedTab(currentTab);
  return (
    <>
      <div
        className={classNames(s.background, isOpened ? '' : s.hidden)}
        onClick={onClose}
      ></div>
      <div className={classNames(s.typeSelectModal, isOpened ? '' : s.hidden)}>
        <div className={s.header}>
          <p>Выберите тип задачи</p>
          {isSpecialist && (
            <Tabs
              options={options}
              value={selectedTab}
              onSelect={onSelectTab}
            />
          )}
          <img className={s.closeBtn} src={closeIcon} onClick={onClose} />
        </div>
        <div className={s.typesGroups}>
          {selectedTab === 'tasks' &&
            Object.entries(typeGroups).map(([key, value]) => (
              <TaskTypeGroup key={key} group={value} onSelect={onSelect} />
            ))}
          {selectedTab === 'templates' && !templates.length && 'Нет шаблонов'}
          {selectedTab === 'templates' &&
            Object.entries(templateGroups).map(([key, value]) => (
              <TaskTemplateGroup
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
