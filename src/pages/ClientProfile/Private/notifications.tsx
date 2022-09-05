import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { triggerNotification } from '../../../utils/notifications';

export const successCreateAnalyzeNotification = () => {
  triggerNotification('Анализ успешно загружен', NotificationType.SUCCESS);
};

export const successDeleteAnalyzeNotification = () => {
  triggerNotification('Анализ удален', NotificationType.SUCCESS);
};

export const errorCreateAnalyzeNotification = () => {
  triggerNotification('Произошла ошибка!', NotificationType.DANGER);
};

export const errorDeleteAnalyzeNotification = () => {
  triggerNotification('Произошла ошибка', NotificationType.DANGER);
};

export const successDeleteProgressNotification = () => {
  triggerNotification('Запись удалена!', NotificationType.SUCCESS);
};

export const errorDeleteProgressNotification = () => {
  triggerNotification('Произошла ошибка!', NotificationType.DANGER);
};
