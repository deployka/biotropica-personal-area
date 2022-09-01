import { ResponseError } from '../../@types/api/response';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { triggerNotification } from '../../utils/notifications';

export const successCreateRecommendationNotification = () =>
  triggerNotification('Рекомендация создана', NotificationType.SUCCESS);

export const errorCreateRecommendationNotification = (error?: ResponseError) =>
  triggerNotification(
    error?.data.message || 'Произошла ошибка',
    NotificationType.DANGER,
  );

export const successDeleteRecommendationNotification = () =>
  triggerNotification('Рекомендация удалена', NotificationType.SUCCESS);

export const errorDeleteRecommendationNotification = () =>
  triggerNotification('Произошла ошибка', NotificationType.DANGER);

export const successUnbanNotification = () =>
  triggerNotification('Пользователь разблокирован', NotificationType.SUCCESS);

export const errorUnbanNotification = () =>
  triggerNotification('Произошла ошибка', NotificationType.DANGER);
