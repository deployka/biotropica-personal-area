import { EventTask } from '../../../store/@types/Task';
import { SelectOptions } from '../../Select/SelectCustom';

export const translatedRepeatType: Record<EventTask['repeatType'], string> = {
  daily: 'день',
  weekly: 'неделю',
  monthly: 'месяц',
  annually: 'год',
};

export const translatedKindOfEvent: Record<EventTask['kindOfEvent'], string> = {
  restDay: 'День отдыха',
  illness: 'Болезнь',
  relocation: 'Переезд',
  note: 'Заметка',
  nutrition: 'Питание',
  regime: 'Нарушение режима',
  trouble: 'Проблема',
  menstruation: 'Женский цикл',
  vitamins: 'Витамины',
  video: 'Видео',
};

export const eventTaskOptions: SelectOptions<EventTask['kindOfEvent']>[] =
  Object.keys(translatedKindOfEvent).map((key: string) => {
    return {
      value: key as EventTask['kindOfEvent'],
      label: translatedKindOfEvent[key as EventTask['kindOfEvent']],
    };
  });

export const selectRepeatType: SelectOptions<EventTask['repeatType']>[] =
  Object.keys(translatedRepeatType).map((key: string) => {
    return {
      value: key as EventTask['repeatType'],
      label: translatedRepeatType[key as EventTask['repeatType']],
    };
  });

export const translatedCompletionType: Record<
  EventTask['completionType'],
  string
> = {
  byDate: 'До определенной даты',
  byRepetitionsNumber: 'Количество повторений',
};

export const selectCompletionType: SelectOptions<
  EventTask['completionType']
>[] = Object.keys(translatedCompletionType).map((key: string) => {
  return {
    value: key as EventTask['completionType'],
    label: translatedCompletionType[key as EventTask['completionType']],
  };
});
