import {
  CyclingCompetitionType,
  KindOfCompetitionSport,
  RunCompetitionType,
  SkisCompetitionType,
  SwimCompetitionType,
  TaskPriority,
  TriathlonCompetitionType,
} from '../../../@types/entities/Task';
import { SelectOptions } from '../../Select/SelectCustom';

export const translatedKindOfCompetitionSport: Record<
  KindOfCompetitionSport,
  string
> = {
  run: 'Бег',
  triathlon: 'Триатлон',
  swimming: 'Плавание',
  cycling: 'Велоспорт',
  skis: 'Лыжи',
};

export const translatedRunCompetitionType: Record<RunCompetitionType, string> =
  {
    marathon: 'Марафон',
    halfMarathon: 'Полумарафон',
    tenKm: '10 км',
    fiveKm: '5 км',
    timePlan: 'План по времени',
    distancePlan: 'План по расстоянию',
  };

export const translateTriathlonCompetitionType: Record<
  TriathlonCompetitionType,
  string
> = {
  marathon: 'Полная дистанция',
  halfMarathon: '½ полной дистанции',
  tenKm: '¼ полной дистанции',
  fiveKm: 'Олимпийская дистанция',
  timePlan: 'Спринт',
  distancePlan: '⅛ полной дистанции',
};

export const translatedSwimCompetitionType: Record<
  SwimCompetitionType,
  string
> = {
  meters10000: '10 000 метров',
  meters7000: '7 000 метров',
  meters5000: '5 000 метров',
  meters4000: '4 000 метров',
  meters3000: '3 000 метров',
  meters1000: '1 000 метров',
  mile: 'Миля (1 852 м)',
  minutes60: '60 минут',
  minutes30: '30 минут',
  timePlan: 'План по времени',
  distancePlan: 'План по расстоянию',
};

export const translatedCyclingCompetitionType: Record<
  CyclingCompetitionType,
  string
> = {
  timePlan: 'План по времени',
  distancePlan: 'План по расстоянию',
};

export const translatedSkisCompetitionType: Record<
  SkisCompetitionType,
  string
> = {
  km10: '10 км',
  km15: '15 км',
  km30: '30 км',
  km50: '50 км',
  km70: '70 км',
  timePlan: 'План по времени',
  distancePlan: 'План по расстоянию',
};

export const translatedTaskPriority: Record<TaskPriority, string> = {
  A: 'A',
  B: 'B',
  C: 'C',
};

function createSelectArray<
  TypeKeys extends
    | RunCompetitionType
    | KindOfCompetitionSport
    | SwimCompetitionType
    | CyclingCompetitionType
    | SkisCompetitionType
    | TriathlonCompetitionType
    | TaskPriority,
>(obj: Record<TypeKeys, string>): SelectOptions<TypeKeys>[] {
  return Object.keys(obj).map((key: string) => ({
    value: key as TypeKeys,
    label: obj[key as TypeKeys],
  }));
}

export const selectKindOfCompetitionSport = createSelectArray(
  translatedKindOfCompetitionSport,
);

export const selectRunCompetitionType = createSelectArray(
  translatedRunCompetitionType,
);
export const selectTriathlonCompetitionType = createSelectArray(
  translateTriathlonCompetitionType,
);

export const selectSwimCompetitionType = createSelectArray(
  translatedSwimCompetitionType,
);
export const selectCyclingCompetitionType = createSelectArray(
  translatedCyclingCompetitionType,
);

export const selectSkisCompetitionType = createSelectArray(
  translatedSkisCompetitionType,
);

export const selectTaskPriority = createSelectArray(translatedTaskPriority);

export function getCompetitionTypeOptions(kindOfSport: KindOfCompetitionSport) {
  switch (kindOfSport) {
    case 'run':
      return selectRunCompetitionType;
    case 'triathlon':
      return selectTriathlonCompetitionType;
    case 'swimming':
      return selectSwimCompetitionType;
    case 'cycling':
      return selectCyclingCompetitionType;
    case 'skis':
      return selectSkisCompetitionType;
    default:
      return [];
  }
}

export function getTranslatedCompetitionType(
  kindOfSport: KindOfCompetitionSport,
  competitionType:
    | RunCompetitionType
    | SkisCompetitionType
    | TriathlonCompetitionType
    | SwimCompetitionType
    | CyclingCompetitionType,
) {
  switch (kindOfSport) {
    case 'run':
      return translatedRunCompetitionType[
        competitionType as RunCompetitionType
      ];
    case 'triathlon':
      return translateTriathlonCompetitionType[
        competitionType as TriathlonCompetitionType
      ];
    case 'swimming':
      return translatedSwimCompetitionType[
        competitionType as SwimCompetitionType
      ];
    case 'cycling':
      return translatedCyclingCompetitionType[
        competitionType as CyclingCompetitionType
      ];
    case 'skis':
      return translatedSkisCompetitionType[
        competitionType as SkisCompetitionType
      ];
    default:
      return '';
  }
}

export function getDefaultCompetitionType(kindOfSport: KindOfCompetitionSport) {
  switch (kindOfSport) {
    case 'run':
      return RunCompetitionType.distancePlan;
    case 'triathlon':
      return TriathlonCompetitionType.eighthOfDistance;
    case 'swimming':
      return SwimCompetitionType.distancePlan;
    case 'cycling':
      return CyclingCompetitionType.distancePlan;
    case 'skis':
      return SkisCompetitionType.distancePlan;
    default:
      return RunCompetitionType.distancePlan;
  }
}

export function getPlanValueMeasure(
  kindOfSport: KindOfCompetitionSport,
  competitionType:
    | RunCompetitionType
    | SkisCompetitionType
    | TriathlonCompetitionType
    | SwimCompetitionType
    | CyclingCompetitionType,
) {
  switch (competitionType) {
    case 'minutes60':
    case 'minutes30':
    case 'distancePlan':
      return kindOfSport === 'swimming' ? 'м' : 'км';
    case 'timePlan':
    case 'meters10000':
    case 'meters7000':
    case 'meters5000':
    case 'meters4000':
    case 'meters3000':
    case 'meters1000':
    case 'mile':
    case 'marathon':
    case 'halfMarathon':
    case 'tenKm':
    case 'fiveKm':
    case 'km10':
    case 'km15':
    case 'km30':
    case 'km50':
    case 'km70':
      return 'мин';
    default:
      return '';
  }
}
