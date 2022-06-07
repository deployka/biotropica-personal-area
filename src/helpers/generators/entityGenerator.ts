import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import { Task } from '../../@types/entities/Task';

export function randomInArr<T>(options: T[]): T {
  return options[Math.floor(Math.random() * options.length)];
}

export function generateTask(task: Partial<Task> = {}): Task {
  const taskId = generateUniqueID();
  return {
    id: taskId,
    date: randomInArr([
      '2022-01-01',
      '2022-01-02',
      '2022-01-03',
      '2022-01-04',
      '2022-01-05',
      '2022-01-06',
      '2022-01-07',
      '2022-01-08',
    ]),
    endTime: randomInArr(['18:00:00', '19:00:00', '20:00:00', undefined]),
    startTime: randomInArr(['12:00:00', '14:00:00', '16:00:00', undefined]),
    status: randomInArr(['init', 'completed', 'failed', 'nearly']),
    title: `Задачи № ${taskId}`,
    type: randomInArr(['training', 'competition', 'event']),
    comments: [],
    executorId: 122,
    ...task,
  };
}
