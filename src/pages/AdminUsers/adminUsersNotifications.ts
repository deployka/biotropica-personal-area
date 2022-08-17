import { ResponseError } from '../../@types/api/response';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { triggerNotification } from '../../utils/notifications';

export const successCreateUserNotification = () =>
  triggerNotification(
    'Ссылка для создания пароля успешно отправлена!',
    NotificationType.SUCCESS,
  );

export const errorCreateUserNotification = (error?: ResponseError) =>
  triggerNotification(
    error?.data.message || 'Произошла ошибка',
    NotificationType.DANGER,
  );

export const successBanNotification = () =>
  triggerNotification('Пользователь заблокирован', NotificationType.SUCCESS);

export const errorBanNotification = () =>
  triggerNotification('Произошла ошибка', NotificationType.DANGER);

export const successUnbanNotification = () =>
  triggerNotification('Пользователь разблокирован', NotificationType.SUCCESS);

export const errorUnbanNotification = () =>
  triggerNotification('Произошла ошибка', NotificationType.DANGER);
