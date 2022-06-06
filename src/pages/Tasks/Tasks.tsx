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
} from '../../store/slices/tasksPageSlice';
import { useAppSelector } from '../../store/storeHooks';
import { TaskCalendar } from '../../components/Calendar/TaskCalendar';
import { TaskTypeSelectModal } from '../../components/Task/TypeSelectModal/TypeSelectModal';
import {
  CompetitionTask,
  CreateSomeTask,
  EventTask,
  KindOfSport,
  SomeTask,
  TaskTemplate,
  TaskType,
  TrainingCategory,
  TrainingTask,
} from '../../store/@types/Task';

import { createTaskByType } from './CreateTaskHelper';
import { useHistory, useParams } from 'react-router-dom';
import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { NotificationButtons } from './NotificationButtons';
import { selectIsDoctor } from '../../store/slices/authSlice';

import { Tabs } from '../../components/Tabs/Tabs';
import { TasksModal } from '../../components/Task/Modal/Modal';
import { useRequestUserDataQuery } from '../../store/rtk/requests/user';

export function Tasks() {
  const { data: currentUser } = useRequestUserDataQuery();
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

  const isSpecialist = useSelector(selectIsDoctor);

  const { data: tasks = [], isError } = useGetTaskListQuery({
    userId,
  });

  const { data: comments = [] } = useGetTaskCommentsQuery(
    { taskId: openedTaskId },
    {
      skip: !openedTaskId,
    },
  );

  const templates: SomeTask[] = [
    {
      id: '06fce062-389f-4da5-a92e-81347b7f9d61',
      authorId: 15,
      executorId: 15,
      title: 'Пробежка',
      type: 'training',
      date: '2022-04-23',
      startTime: '12:00:00',
      endTime: '',
      status: 'init',
      description: '',
      isTemplate: true,
      templateName: 'Тренировка для спины',
      kindOfSport: KindOfSport.swimming,
      comments: [],
      category: TrainingCategory.power,
      firstTargetType: 'time',
      firstTargetValue: 12,
      secondTargetType: 'pulse',
      secondTargetValue: 12,
    },
  ];

  useEffect(() => {
    if (!openedTask || !comments.length) return;
    setOpenedTask({ ...openedTask, comments });
  }, [comments, setOpenedTask]);

  function handleCloseTask() {
    setOpenedTaskId('');
    setOpenedTask(null);
    setIsTaskModalOpen(false);
    setTaskModalMode('view');
  }

  async function handleSaveTask(task: CreateSomeTask | SomeTask) {
    if ('id' in task) {
      try {
        await updateTask({ ...task }).unwrap();
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
        await createTask({ ...task, executorId: userId }).unwrap();
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

  async function onDelete() {
    try {
      eventBus.emit(EventTypes.removeNotification, 'delete-notification');
      await deleteTask(openedTaskId);
      eventBus.emit(EventTypes.notification, {
        type: NotificationType.SUCCESS,
        message: `Задача "${openedTask?.title}" успешно удалена!`,
      });
      handleCloseTask();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        type: NotificationType.DANGER,
        message: 'При удалении произошла ошибка, попробуйте еще раз',
      });
    }
  }

  function onDiscard() {
    eventBus.emit(EventTypes.removeNotification, 'delete-notification');
  }

  async function handleDeleteTask() {
    eventBus.emit(EventTypes.notification, {
      type: NotificationType.WARNING,
      title: `Удалить задачу ${openedTask?.title}?`,
      dismiss: undefined,
      message: (
        <NotificationButtons onDelete={onDelete} onDiscard={onDiscard} />
      ),
    });
  }
  async function handleSendComment(commentText: string) {
    // TODO: добавить обработку ошибок
    await addComment({ taskId: openedTaskId, commentText }).unwrap();
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
  function handleSelectTaskType(selectedType: TaskType | TaskTemplate) {
    const newTask =
      'templateName' in selectedType
        ? templates.find(t => t.id === selectedType.id)
        : createTaskByType(selectedType, userId);

    setOpenedTaskId('');
    setOpenedTask(newTask || null);
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
  async function onChangeTemplateName(templateId: string, value: string) {
    console.log(templateId, value);
  }
  async function handleSaveAsTemplate(task: Partial<CreateSomeTask>) {
    const newTemplate = {
      ...task,
      templateName: task.title,
    };
    try {
      await createTask({ ...newTemplate, executorId: userId }).unwrap();
      eventBus.emit(EventTypes.notification, {
        type: NotificationType.SUCCESS,
        message: 'Шаблон успешно создан!',
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        type: NotificationType.DANGER,
        message: 'Произошла ошибка при создании шаблона!',
      });
    }

    handleCloseTask();
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
        onChangeTemplateName={onChangeTemplateName}
        templates={templates}
        isSpecialist={isSpecialist}
        isOpened={isTypeSelectModalOpened}
        onClose={() => setIsTypeSelectModalOpened(false)}
        onSelect={handleSelectTaskType}
      />

      <TasksModal
        currentUserId={currentUser?.id || 0}
        isSpecialist={isSpecialist}
        isLoading={isUpdateLoading || isCreateLoading}
        task={openedTask}
        taskId={openedTaskId}
        mode={taskModalMode}
        isOpened={isTaskModalOpen}
        onClose={handleCloseTask}
        onEditBtnClick={handleEditClick}
        onSendComment={handleSendComment}
        onSave={handleSaveTask}
        onSaveAsTemplate={handleSaveAsTemplate}
        onDeleteTask={handleDeleteTask}
        onSaveFirstValue={handleSaveFirstFactValue}
        onSaveSecondValue={handleSaveSecondFactValue}
        onSaveFactValue={handleSaveFactValue}
      />
    </>
  );
}
