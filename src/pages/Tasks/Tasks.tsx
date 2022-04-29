import React, { useState, useEffect } from 'react';
import {
  useAddTaskCommentMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskCommentsQuery,
  useGetTaskListQuery,
  useUpdateTaskMutation,
} from '../../store/rtk/requests/tasks';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTasksPageCurrentMonth,
  setCurrentMonth,
} from '../../store/rtk/slices/tasksPageSlice';
import { useAppSelector } from '../../store/rtk/storeHooks';
import { TaskCalendar } from '../../components/TaskCalendar/TaskCalendar';
import { TaskTypeSelectModal } from '../../components/TaskTypeSelectModal/TaskTypeSelectModal';
import {
  CompetitionTask,
  CreateSomeTask,
  EventTask,
  SomeTask,
  TaskType,
  TrainingTask,
} from '../../store/@types/Task';
import { TasksModal } from './TasksModal';
import { createTaskByType } from './CreateTaskHelper';
import { useHistory, useParams } from 'react-router-dom';
import { selectCurrentUserData } from '../../store/ducks/user/selectors';
import s from './Tasks.module.scss';
import classNames from 'classnames';
import { Tabs } from '../../components/Tabs/Tabs';
import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';

export function Tasks() {
  const currentUser = useSelector(selectCurrentUserData);
  const dispatch = useDispatch();
  const [updateTask, { isLoading: isUpdateLoading }] = useUpdateTaskMutation();
  const [createTask, { isLoading: isCreateLoading }] = useCreateTaskMutation();
  const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation();
  const [addComment, { isLoading: isCommentLoading }] =
    useAddTaskCommentMutation();

  const { userId: rawUserId } = useParams<{ userId: string }>();

  const id = rawUserId || currentUser?.id;

  const history = useHistory();

  const userId = Number(id);

  if (userId === 0) {
    history.push('/');
  }

  const [isTypeSelectModalOpened, setIsTypeSelectModalOpened] = useState(false);

  const [openedTaskId, setOpenedTaskId] = useState<string>('');

  const [openedTask, setOpenedTask] = useState<
    CreateSomeTask | SomeTask | null
  >(null);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [taskModalMode, setTaskModalMode] = useState<'edit' | 'view'>('view');

  const currentMonth = useAppSelector(selectTasksPageCurrentMonth);

  const { data: tasks = [], isError } = useGetTaskListQuery({
    userId,
  });

  const { data: comments = [] } = useGetTaskCommentsQuery(
    { taskId: openedTaskId },
    {
      skip: !openedTaskId,
    },
  );

  useEffect(() => {
    if (!openedTask) return;

    setOpenedTask({ ...openedTask, comments });
  }, [comments]);

  function handleCloseTask() {
    setOpenedTaskId('');
    setIsTaskModalOpen(false);
    setTaskModalMode('view');
  }

  async function handleSaveTask(task: CreateSomeTask | SomeTask) {
    if ('id' in task) {
      try {
        await updateTask({ ...task });
        eventBus.emit(EventTypes.notification, {
          type: NotificationType.SUCCESS,
          message: 'Задача успешно обновлена!',
        });
      } catch (error) {
        eventBus.emit(EventTypes.notification, {
          type: NotificationType.DANGER,
          message: 'Не удалось сохранить задачу',
        });
      }
    } else {
      try {
        await createTask({ ...task, executorId: userId });
        eventBus.emit(EventTypes.notification, {
          type: NotificationType.SUCCESS,
          message: 'Задача успешно создана!',
        });
      } catch (error) {
        eventBus.emit(EventTypes.notification, {
          type: NotificationType.DANGER,
          message: 'Не удалось создать задачу',
        });
      }
    }
    handleCloseTask();
  }

  async function handleDeleteTask() {
    await deleteTask(openedTaskId);
    handleCloseTask();
  }

  async function handleSendComment(commentText: string) {
    await addComment({ taskId: openedTaskId, commentText });
  }

  function handelTaskClick(taskId: string) {
    setOpenedTaskId(taskId);

    const task = tasks.find(task => task.id === taskId);

    if (task) {
      setOpenedTask({
        ...(task as TrainingTask | CompetitionTask | EventTask),
        comments: [],
      });
      return setIsTaskModalOpen(true);
    }
  }

  function handleEditClick() {
    setTaskModalMode('edit');
  }

  function handleCreateNewTask() {
    setIsTypeSelectModalOpened(true);
  }

  function handleSelectTaskType(selectedType: TaskType) {
    const newTask: CreateSomeTask | null = createTaskByType(
      selectedType,
      userId,
    );

    setOpenedTaskId('');
    setOpenedTask(newTask);
    setIsTaskModalOpen(true);
    setIsTypeSelectModalOpened(false);
    setTaskModalMode('edit');
  }

  function handleChangeMonth(month: string) {
    dispatch(setCurrentMonth(month));
  }

  async function handleSaveFirstFactValue(value: number | undefined) {
    await updateTask({ id: openedTaskId, firstFactValue: value });
  }

  async function handleSaveSecondFactValue(value: number | undefined) {
    await updateTask({ id: openedTaskId, secondFactValue: value });
  }

  async function handleSaveFactValue(value: number) {
    await updateTask({ id: openedTaskId, factValue: value });
  }

  if (isError) {
    return (
      <>
        <p>Возникла ошибка. Попробуйте позже</p>
        <TaskCalendar
          tasks={[]}
          currentMonth={currentMonth}
          onChangeCurrentMonth={handleChangeMonth}
          onAddTask={handleCreateNewTask}
          onClickTask={handelTaskClick}
        />
      </>
    );
  }

  return (
    <>
      <Tabs
        value="tasks"
        options={[
          {
            label: 'Задачи',
            value: 'tasks',
          },
          {
            label: 'Рекомендации',
            value: 'recommendations',
          },
        ]}
        onSelect={value => {
          if (value === 'recommendations' && rawUserId) {
            history.push(`/users/${userId}/recommendations`);
          } else if (value === 'recommendations') {
            history.push('/recommendations');
          }
        }}
      />
      <TaskCalendar
        tasks={tasks || []}
        currentMonth={currentMonth}
        onChangeCurrentMonth={handleChangeMonth}
        onAddTask={handleCreateNewTask}
        onClickTask={handelTaskClick}
      />

      <TaskTypeSelectModal
        isOpened={isTypeSelectModalOpened}
        onClose={() => {
          setIsTypeSelectModalOpened(false);
        }}
        onSelect={handleSelectTaskType}
      />

      <TasksModal
        isLoading={isUpdateLoading || isCreateLoading}
        task={openedTask}
        mode={taskModalMode}
        isOpened={isTaskModalOpen}
        onClose={handleCloseTask}
        onEditBtnClick={handleEditClick}
        onSendComment={handleSendComment}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        onSaveFirstValue={handleSaveFirstFactValue}
        onSaveSecondValue={handleSaveSecondFactValue}
        onSaveFactValue={handleSaveFactValue}
      />
    </>
  );
}
