import { ResponseError } from '../../@types/api/response';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { triggerNotification } from '../../utils/notifications';

export const successDeleteConsultationNotification = () =>
  triggerNotification('Консультация удалена', NotificationType.SUCCESS);

export const errorDeleteConsultationNotification = () =>
  triggerNotification('Ошибка удаления консультации', NotificationType.DANGER);

export const errorUpdateConsultationNotification = () =>
  triggerNotification(
    'Ошибка обновления консультации',
    NotificationType.DANGER,
  );

export const successUpdateConsultationNotification = () =>
  triggerNotification('Консультация обновлена', NotificationType.SUCCESS);

export const errorUnbanNotification = () =>
  triggerNotification('Произошла ошибка', NotificationType.DANGER);
