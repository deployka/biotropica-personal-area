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
} from '../../store/@types/Task';
import { getDefaultCompetitionType } from '../../components/TaskEditor/Competition/CompetitionConstants';

export function createTaskByType(
  selectedTaskType: TaskType,
  executorId: number,
): CreateSomeTask | null {
  switch (selectedTaskType.type) {
    case 'event':
      return {
        type: 'event',
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
        type: 'training',
        kindOfSport: selectedTaskType.key as TrainingTask['kindOfSport'],
        category: TrainingCategory.muscleEndurance,
        firstTargetType: 'time',
        firstTargetValue: 0,
        secondTargetType: 'pulse',
        secondTargetValue: 0,
        title: '',
        date: '',
        status: 'init',
        comments: [],
        executorId: executorId,
      } as CreateTrainingTask;
    case 'competition':
      return {
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
        targetValue: 0,
        executorId: executorId,
      } as CreateCompetitionTask;
    default:
      return null;
  }
}
