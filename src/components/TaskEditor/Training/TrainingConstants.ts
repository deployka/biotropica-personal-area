import {
  KindOfSport,
  TrainingCategory,
  TrainingTask,
} from '../../../store/@types/Task';
import { SelectOptions } from '../../Select/SelectCustom';

export const translatedKindOfSport: Record<KindOfSport, string> = {
  run: 'Бег',
  streetRun: 'Бег по улице',
  indoorRun: 'Бег в помещении',
  crossCountryRun: 'Бег по пересечённой местности',
  treadmill: 'Беговая дорожка',
  swimming: 'Плавание',
  openWaterSwimming: 'Плавание на открытой воде',
  poolSwimming: 'Плавание в бассейне',
  bike: 'Велосипед',
  bikeTrack: 'Велотрек',
  bikeStation: 'Велостанок',
  powerTraining: 'Силовая тренировка',
  skis: 'Лыжи',
  rowing: 'Гребля',
  rowingMachine: 'Гребля тренажёр',
  other: 'Прочее',
};

export const translatedCategories: Record<TrainingCategory, string> = {
  muscleEndurance: 'Мышечная выносливость',
  anaerobicEndurance: 'Анаэробная выносливость',
  aerobicEndurance: 'Развитие силы',
  strengthDevelopment: 'Развитие скорости',
  speedDevelopment: 'Аэробная выносливость',
  functionalTest: 'Функциональный тест',
  power: 'Мощность',
  start: 'Старт',
  recovery: 'Восстановление',
  preparingToStart: 'Подготовка к старту',
};

export const translatedFirstTargetType: Record<
  TrainingTask['firstTargetType'],
  string
> = {
  time: 'Время',
  distance: 'Дистанция',
};

export const translatedSecondTargetType: Record<
  TrainingTask['secondTargetType'],
  string
> = {
  pulse: 'Пульс',
  pace: 'Темп',
};

export const kindOfSportOptions: SelectOptions<TrainingTask['kindOfSport']>[] =
  Object.keys(translatedKindOfSport).map((key: string) => {
    return {
      value: key as TrainingTask['kindOfSport'],
      label: translatedKindOfSport[key as TrainingTask['kindOfSport']],
    };
  });

export const trainingCategoryOptions: SelectOptions<
  TrainingTask['category']
>[] = Object.keys(translatedCategories).map((key: string) => {
  return {
    value: key as TrainingTask['category'],
    label: translatedCategories[key as TrainingTask['category']],
  };
});

export const firstTargetTypeOptions: SelectOptions<
  TrainingTask['firstTargetType']
>[] = Object.keys(translatedFirstTargetType).map((key: string) => {
  return {
    value: key as TrainingTask['firstTargetType'],
    label: translatedFirstTargetType[key as TrainingTask['firstTargetType']],
  };
});

export const secondTargetTypeOptions: SelectOptions<
  TrainingTask['secondTargetType']
>[] = Object.keys(translatedSecondTargetType).map((key: string) => {
  return {
    value: key as TrainingTask['secondTargetType'],
    label: translatedSecondTargetType[key as TrainingTask['secondTargetType']],
  };
});
