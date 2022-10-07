import {
  KindOfCompetitionSport,
  KindOfEvent,
  KindOfSport,
  Task,
} from '../../../@types/entities/Task';
import bikeIcon from './../../../assets/icons/taskType/bike.svg';
import chairIcon from './../../../assets/icons/taskType/chair.svg';
import dangerIcon from './../../../assets/icons/taskType/danger.svg';
import dumbbellIcon from './../../../assets/icons/taskType/dumbbell.svg';
import elseIcon from './../../../assets/icons/taskType/else.svg';
import femaleIcon from './../../../assets/icons/taskType/female.svg';
import regimeIcon from './../../../assets/icons/taskType/regime.svg';
import foodIcon from './../../../assets/icons/taskType/food.svg';
import noteIcon from './../../../assets/icons/taskType/note.svg';
import pillIcon from './../../../assets/icons/taskType/pill.svg';
import planeIcon from './../../../assets/icons/taskType/plane.svg';
import rowingIcon from './../../../assets/icons/taskType/rowing.svg';
import runIcon from './../../../assets/icons/taskType/run.svg';
import skiIcon from './../../../assets/icons/taskType/ski.svg';
import swimIcon from './../../../assets/icons/taskType/swim.svg';
import triathlonIcon from './../../../assets/icons/taskType/triathlon.svg';
import videoIcon from './../../../assets/icons/taskType/video.svg';
import virusIcon from './../../../assets/icons/taskType/virus.svg';
import { TaskTypeGroupModel } from './TypeGroup';

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
        title: 'Плавание',
        icon: swimIcon,
        type: 'training',
        key: KindOfSport.swimming,
      },
      {
        title: 'Гребля',
        icon: rowingIcon,
        type: 'training',
        key: KindOfSport.rowing,
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
        icon: regimeIcon,
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
