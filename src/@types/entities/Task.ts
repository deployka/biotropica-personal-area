import { Comment } from './Comment';

export type Task = {
  id: string;
  authorId?: number;
  executorId: number;
  title: string;
  type: 'training' | 'event' | 'competition';
  date: string; // format: YYYY-MM-DD
  startTime?: string; // format: hh:mm:ss
  endTime?: string; // format: hh:mm:ss
  status: TaskStatus;
  description?: string;
  isTemplate?: boolean;
  templateName?: string;
  comments: Comment[];
};

type CreateTask<T> = Omit<T, 'id'>;

export type EventTask = Task & {
  type: 'event';
  kindOfEvent: KindOfEvent;
  repeatType: 'daily' | 'weekly' | 'monthly' | 'annually';
  completionType: 'byDate' | 'byRepetitionsNumber';
  completionValue: string | number; // string если completionType === 'byDate', number иначе
};

export type TrainingTask = Task & {
  type: 'training';
  kindOfSport: KindOfSport;
  category: TrainingCategory;
  firstTargetType: 'time' | 'distance'; // Время / Дистанция
  firstTargetValue: number;
  secondTargetType: 'pulse' | 'pace'; // Пульс / Темп
  secondTargetValue: number;
  firstFactValue?: number;
  secondFactValue?: number;
};

export type CreateTrainingTask = CreateTask<TrainingTask>;
export type CreateEventTask = CreateTask<EventTask>;
export type CreateCompetitionTask = CreateTask<CompetitionTask>;

export type CreateSomeTask =
  | CreateTrainingTask
  | CreateEventTask
  | CreateCompetitionTask;

export type SomeTask = TrainingTask | EventTask | CompetitionTask;

export type CompetitionTask = Task & {
  type: 'competition';
  kindOfSport: KindOfCompetitionSport;
  competitionType:
    | RunCompetitionType
    | TriathlonCompetitionType
    | SwimCompetitionType
    | CyclingCompetitionType
    | SkisCompetitionType;
  priority: TaskPriority;
  targetValue: number;
  factValue?: number;
};

export type TaskStatus =
  | 'init' // Задача создана
  | 'inProgress' // Задача в процессе выполнения
  | 'failed' // Задача провалена
  | 'completed' // Задача выполнена
  | 'nearly'; // Задача близка к выполнению

export type TaskType = {
  title: string;
  icon: string;
  type: Task['type'];
  key: KindOfSport | KindOfEvent | KindOfCompetitionSport; // вспомогательное значения для упрощения работы с данными
};

export type TaskTemplate = Omit<TaskType, 'key'> & {
  templateName: string;
  id: string;
};

export enum KindOfSport {
  run = 'run', // Бег
  streetRun = 'streetRun', // Бег по улице
  indoorRun = 'indoorRun', // Бег в помещении
  crossCountryRun = 'crossCountryRun', // Бег по пересечённой местности
  treadmill = 'treadmill', // Беговая дорожка
  swimming = 'swimming', // Плавание
  openWaterSwimming = 'openWaterSwimming', // Плавание на открытой воде
  poolSwimming = 'poolSwimming', // Плавание в бассейне
  bike = 'bike', // Велосипед
  bikeTrack = 'bikeTrack', // Велотрек
  bikeStation = 'bikeStation', // Велостанок
  powerTraining = 'powerTraining', // Силовая тренировка
  skis = 'skis', // Лыжи
  rowing = 'rowing', // Гребля
  rowingMachine = 'rowingMachine', // Гребля тренажёр
  other = 'other', // Прочее
}

export enum KindOfEvent {
  restDay = 'restDay', // День отдыха
  illness = 'illness', // Болезнь
  relocation = 'relocation', // Переезд
  note = 'note', // Заметка
  nutrition = 'nutrition', // Питание
  regime = 'regime', // Нарушение режима
  trouble = 'trouble', // Проблема
  menstruation = 'menstruation', // Женский цикл
  vitamins = 'vitamins', // Витамины
  video = 'video', // Видео
}

export enum KindOfCompetitionSport {
  run = 'run', // Бег
  triathlon = 'triathlon', // Триатлон
  swimming = 'swimming', // Плавание
  cycling = 'cycling', // Велоспорт
  skis = 'skis', // Лыжи
}

export enum RunCompetitionType {
  marathon = 'marathon', // Марафон
  halfMarathon = 'halfMarathon', // Полумарафон
  tenKm = 'tenKm', // 10 км
  fiveKm = 'fiveKm', // 5 км
  timePlan = 'timePlan', // План по времени
  distancePlan = 'distancePlan', // План по расстоянию
}

export enum TriathlonCompetitionType {
  fullDistance = 'marathon', // Полная дистанция
  halfFullDistance = 'halfMarathon', // ½ полной дистанции
  quarterFullDistance = 'tenKm', // ¼ полной дистанции
  olympicDistance = 'fiveKm', // Олимпийская дистанция
  sprint = 'timePlan', // Спринт
  eighthOfDistance = 'distancePlan', // ⅛ полной дистанции
  indoor = 'distancePlan', // Indoor
}

export enum SwimCompetitionType {
  meters10000 = 'meters10000', // 10 000 метров
  meters7000 = 'meters7000', // 7 000 метров
  meters5000 = 'meters5000', // 5 000 метров
  meters4000 = 'meters4000', // 4 000 метров
  meters3000 = 'meters3000', // 3 000 метров
  meters1000 = 'meters1000', // 1 000 метров
  mile = 'mile', // Миля (1 852 м)
  minutes60 = 'minutes60', // 60 минут
  minutes30 = 'minutes30', // 30 минут
  timePlan = 'timePlan', // План по времени
  distancePlan = 'distancePlan', // План по расстоянию
}

export enum CyclingCompetitionType {
  timePlan = 'timePlan', // План по времени
  distancePlan = 'distancePlan', // План по расстоянию
}

export enum SkisCompetitionType {
  km10 = 'km10', // 10 км
  km15 = 'km15', // 15 км
  km30 = 'km30', // 30 км
  km50 = 'km50', // 50 км
  km70 = 'km70', // 70 км
  timePlan = 'timePlan', // План по времени
  distancePlan = 'distancePlan', // План по расстоянию
}

export enum TaskPriority {
  A = 'A',
  B = 'B',
  C = 'C',
}

export enum TrainingCategory {
  muscleEndurance = 'muscleEndurance', // Мышечная выносливость
  anaerobicEndurance = 'anaerobicEndurance', // Анаэробная выносливость
  aerobicEndurance = 'aerobicEndurance', // Развитие силы
  strengthDevelopment = 'strengthDevelopment', // Развитие скорости
  speedDevelopment = 'speedDevelopment', // Аэробная выносливость
  functionalTest = 'functionalTest', // Функциональный тест
  power = 'power', // Мощность
  start = 'start', // Старт
  recovery = 'recovery', // Восстановление
  preparingToStart = 'preparingToStart', // Подготовка к старту
}
