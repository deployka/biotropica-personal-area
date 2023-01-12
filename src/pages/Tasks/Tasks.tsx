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

import { tasksNotifications } from './tasksNotifications';
import { triggerNotification } from '../../utils/notifications';
import { TasksModal } from '../../components/Task/Modal/Modal';
import user from '../../store/slices/user';

export function Tasks() {
  const { data: currentUser } = useCurrentUserQuery();
  const dispatch = useDispatch();
  const [updateTask, { isLoading: isUpdateLoading }] = useUpdateTaskMutation();
  const [createTask, { isLoading: isCreateLoading }] = useCreateTaskMutation();
  const [addComment] = useAddTaskCommentMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const isDoctor = useAppSelector(selectIsDoctor);

  const { userId: rawUserId } = useParams<{ userId: string }>();

  const id = rawUserId || currentUser?.id;

  const history = useHistory();

  const userId = Number(id);

  if (userId === 0) {
    history.push('/');
  }

  const [isTypeSelectModalOpened, setIsTypeSelectModalOpened] = useState(false);

  const [openedTaskId, setOpenedTaskId] = useState<string | null>(null);

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
      { taskId: openedTaskId || '' },
      {
        skip: !openedTaskId,
      },
    );

  useEffect(() => {
    if (!comments.length) return;
    setOpenedTask(prevState => {
      if (!prevState) return null;
      return { ...prevState, comments };
    });
  }, [comments]);

  function handleCloseTask() {
    setOpenedTaskId(null);
    setOpenedTask(null);
    setIsTaskModalOpen(false);
    setTaskModalMode('view');
  }

  async function handleSaveTask(task: CreateSomeTask | SomeTask) {
    if ('id' in task && task.id) {
      try {
        await updateTask({ ...task }).unwrap();
        tasksNotifications.successUpdateTask();
      } catch (error) {
        tasksNotifications.errorUpdateTask();
      }
    } else {
      try {
        await createTask({ ...task, executorId: userId }).unwrap();
        tasksNotifications.successCreateTask();
      } catch (error) {
        tasksNotifications.errorCreateTask();
      }
    }
    handleCloseTask();
  }
  async function onDelete() {
    if (!openedTaskId) return;
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

    const newTemplate: CreateSomeTask & { id: undefined } = {
      ...openedTask,
      id: undefined,
      isTemplate: true,
      date: openedTask.date,
      startTime: undefined,
      templateName: '',
    };

    try {
      await createTask({ ...newTemplate, executorId: userId }).unwrap();
      tasksNotifications.successCreateTemplate();
    } catch (error) {
      tasksNotifications.errorCreateTemplate();
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
    if (!openedTaskId) return;
    try {
      await addComment({ taskId: openedTaskId, commentText }).unwrap();
      triggerNotification('Комментарий отправлен', NotificationType.SUCCESS);
    } catch (error) {
      triggerNotification(
        'Ошибка создания комментария',
        NotificationType.DANGER,
      );
    }
  }
  function handelTaskClick(taskId: string) {
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
      return;
    }

    const isPrivate =
      task.isPrivate && currentUser?.id !== task.authorId && isDoctor;

    if (isPrivate) {
      return;
    }

    setOpenedTaskId(taskId);

    setOpenedTask({
      ...(task as TrainingTask | CompetitionTask | EventTask),
      comments: [],
    });
    return setIsTaskModalOpen(true);
  }
  function handleEditClick() {
    setTaskModalMode('edit');
  }
  function handleCreateNewTask() {
    setIsTypeSelectModalOpened(true);
  }
  function handleSelectTaskType(selectedType: TaskType | TaskTemplate) {
    if ('templateName' in selectedType) {
      const newTask = templates.find(t => t.id === selectedType.id);
      if (!newTask) return setOpenedTask(null);
      const { id, ...newTemplateTask } = newTask;
      setOpenedTask({ ...newTemplateTask, isTemplate: false });
    } else {
      setOpenedTask(createTaskByType(selectedType, userId));
    }
    setOpenedTaskId('');
    setIsTaskModalOpen(true);
    setIsTypeSelectModalOpened(false);
    setTaskModalMode('create');
  }
  function handleChangeMonth(month: string) {
    dispatch(setCurrentMonth(month));
  }
  async function handleSaveFirstFactValue(value: string | undefined) {
    if (!openedTaskId) return;
    await updateTask({ id: openedTaskId, firstFactValue: value });
  }
  async function handleSaveSecondFactValue(value: string | undefined) {
    if (!openedTaskId) return;
    await updateTask({ id: openedTaskId, secondFactValue: value });
  }
  async function handleSaveFactValue(value: string) {
    if (!openedTaskId) return;
    await updateTask({ id: openedTaskId, factValue: value });
  }
  async function handleDeleteTemplate(templateId: string) {
    try {
      await deleteTask(templateId).unwrap();
      tasksNotifications.successDeleteTemplate();
    } catch (error) {
      console.log(error);
      tasksNotifications.errorDeleteTemplate();
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
        isClient={!isSpecialist && !isAdmin}
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
        taskId={openedTaskId || ''}
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
