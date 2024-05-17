import {
  CompetitionTask,
  CreateCompetitionTask,
  CreateEventTask,
  CreateSomeTask,
  CreateTrainingTask,
  EventTask,
  TaskPriority,
  TaskType,
  TrainingCategory,
  TrainingTask,
} from '../../@types/entities/Task';

import { getDefaultCompetitionType } from '../../components/TaskEditor/Competition/CompetitionConstants';

export function createTaskByType(
  selectedTaskType: TaskType,
  executorId: number,
): CreateSomeTask | null {
  switch (selectedTaskType.type) {
    case 'event':
      return {
        isPrivate: false,
        type: 'event',
        authorId: 0,
        title: '',
        date: '',
        status: 'init',
        kindOfEvent: selectedTaskType.key as EventTask['kindOfEvent'],
        repeatType: 'daily',
        completionType: 'byRepetitionsNumber',
        completionValue: 1,
        comments: [],
        executorId: executorId,
      } as CreateEventTask;
    case 'training':
      return {
        isPrivate: false,
        type: 'training',
        kindOfSport: selectedTaskType.key as TrainingTask['kindOfSport'],
        category: TrainingCategory.muscleEndurance,
        firstTargetType: 'time',
        firstTargetValue: '',
        secondTargetType: 'pulse',
        secondTargetValue: '',
        title: '',
        date: '',
        status: 'init',
        comments: [],
        executorId: executorId,
        authorId: 0,
      } as CreateTrainingTask;
    case 'competition':
      return {
        isPrivate: false,
        type: 'competition',
        status: 'init',
        kindOfSport: selectedTaskType.key as CompetitionTask['kindOfSport'],
        title: '',
        date: '',
        comments: [],
        competitionType: getDefaultCompetitionType(
          selectedTaskType.key as CompetitionTask['kindOfSport'],
        ),
        priority: TaskPriority.A,
        targetValue: '',
        executorId: executorId,
        authorId: 0,
      } as CreateCompetitionTask;
    default:
      return null;
  }
}
