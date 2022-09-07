import React, { useState, useEffect } from 'react';
import {
  useAddTaskCommentMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskCommentsQuery,
  useGetTaskListQuery,
  useGetTemplatesListQuery,
  useUpdateTaskMutation,
} from '../../api/tasks';
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
  SomeTask,
  TaskTemplate,
  TaskType,
  TrainingTask,
} from '../../@types/entities/Task';

import { createTaskByType } from './CreateTaskHelper';
import { useHistory, useParams } from 'react-router-dom';
import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { NotificationButtons } from './NotificationButtons';
import { selectIsAdmin, selectIsDoctor } from '../../store/slices/authSlice';
import { useCurrentUserQuery } from '../../api/user';

import { Tabs } from '../../components/Tabs/Tabs';
import { TasksModal } from '../../components/Task/Modal/Modal';

export function Tasks() {
  const { data: currentUser } = useCurrentUserQuery();
  const dispatch = useDispatch();
  const [updateTask, { isLoading: isUpdateLoading }] = useUpdateTaskMutation();
  const [createTask, { isLoading: isCreateLoading }] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [addComment] = useAddTaskCommentMutation();

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

  const [taskModalMode, setTaskModalMode] = useState<
    'edit' | 'view' | 'create'
  >('view');

  const currentMonth = useAppSelector(selectTasksPageCurrentMonth);

  const isSpecialist = useSelector(selectIsDoctor);
  const isAdmin = useSelector(selectIsAdmin);

  const { data: tasks = [], isError } = useGetTaskListQuery({
    userId,
  });

  const { data: templates = [] } = useGetTemplatesListQuery();

  const { data: comments = [], isFetching: isCommentsLoading } =
    useGetTaskCommentsQuery(
      { taskId: openedTaskId },
      {
        skip: !openedTaskId,
      },
    );

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
    if ('id' in task && task.id) {
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

  async function handleCreateTemplate() {
    if (!openedTask) return;

    const newTemplate = {
      ...openedTask,
      id: undefined,
      isTemplate: true,
      data: '',
      startTime: undefined,
      templateName: openedTask.title,
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

  async function handleDeleteTask() {
    eventBus.emit(EventTypes.notification, {
      type: NotificationType.WARNING,
      title: `Удалить задачу ${openedTask?.title}?`,
      autoClose: false,
      theme: 'dark',
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
    if (newTask) {
      setOpenedTask({ ...newTask, id: undefined, isTemplate: false });
    } else {
      setOpenedTask(null);
    }
    setOpenedTaskId('');
    setIsTaskModalOpen(true);
    setIsTypeSelectModalOpened(false);
    setTaskModalMode('create');
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
  async function handleDeleteTemplate(templateId: string) {
    try {
      await deleteTask(templateId).unwrap();
      eventBus.emit(EventTypes.notification, {
        type: NotificationType.SUCCESS,
        message: 'Шаблон удален',
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        type: NotificationType.DANGER,
        message: 'Произошла ошибка',
      });
    }
  }
  async function onChangeTemplateName(templateId: string, value: string) {
    try {
      await updateTask({ id: templateId, templateName: value }).unwrap();
    } catch (error) {
      console.log(error);
    }
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
        onDeleteTemplate={handleDeleteTemplate}
        templates={templates}
        isSpecialist={isSpecialist}
        isOpened={isTypeSelectModalOpened}
        onClose={() => setIsTypeSelectModalOpened(false)}
        onSelect={handleSelectTaskType}
      />

      <TasksModal
        currentUserId={currentUser?.id || 0}
        isAdmin={isAdmin}
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
        onCreateTemplate={handleCreateTemplate}
        onDeleteTask={handleDeleteTask}
        onSaveFirstValue={handleSaveFirstFactValue}
        onSaveSecondValue={handleSaveSecondFactValue}
        onSaveFactValue={handleSaveFactValue}
        isCommentsLoading={isCommentsLoading}
      />
    </>
  );
}
