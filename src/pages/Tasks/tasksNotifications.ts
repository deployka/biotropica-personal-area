import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { triggerNotification } from '../../utils/notifications';

export const tasksNotifications = {
  successCreateTask: () =>
    triggerNotification('Задача создана', NotificationType.SUCCESS),
  errorCreateTask: () =>
    triggerNotification('Не удалось создать задачу', NotificationType.DANGER),
  successUpdateTask: () =>
    triggerNotification('Задача обновлена', NotificationType.SUCCESS),
  errorUpdateTask: () =>
    triggerNotification('Не удалось обновить задачу', NotificationType.DANGER),
  successCreateTemplate: () =>
    triggerNotification('Шаблон создан', NotificationType.SUCCESS),
  errorCreateTemplate: () =>
    triggerNotification('Произошла ошибка', NotificationType.DANGER),
  successDeleteTemplate: () =>
    triggerNotification('Шаблон удален', NotificationType.SUCCESS),
  errorDeleteTemplate: () =>
    triggerNotification('Произошла ошибка', NotificationType.DANGER),
};
