import { SomeTask } from '../../../@types/entities/Task';
import { typeGroups } from '../../Task/TypeSelectModal/taskTypeConstants';

type TaskDecor = {
  icon: string;
  color: string;
};

const taskTypeColor = {
  training: '#3b82f6',
  event: '#00ccb3',
  competition: '#f6963b',
};

export function getTaskDecor(task: SomeTask): TaskDecor {
  let color;
  let icon;
  const typeGroup = typeGroups[task.type];

  if (task.type === 'training') {
    const taskInfo = typeGroup.taskTypeGroup.find(
      it => it.key === task.kindOfSport,
    );
    color = taskInfo?.color;
    icon = taskInfo?.icon || '';
  } else if (task.type === 'event') {
    const taskInfo = typeGroup.taskTypeGroup.find(
      it => it.key === task.kindOfEvent,
    );
    color = taskInfo?.color;
    icon = taskInfo?.icon || '';
  } else {
    const taskInfo = typeGroup.taskTypeGroup.find(
      it => it.key === task.kindOfSport,
    );
    color = taskInfo?.color;
    icon = taskInfo?.icon || '';
  }

  if (!color) {
    color = taskTypeColor[task.type];
  }

  return {
    icon,
    color,
  };
}

type TaskStatus = 'completed' | 'inProgress' | 'nearly' | 'failed';

export function getTaskStatus(task: SomeTask, isPast: boolean): TaskStatus {
  let status: TaskStatus = isPast ? 'completed' : 'inProgress';

  if (task.type === 'training') {
    const factValue = task.firstFactValue || 0;
    if (factValue === 0) {
      status = 'failed';
    }

    if (factValue !== 0 && factValue < task.firstTargetValue) {
      status = 'nearly';
    }
  }

  return status;
}
