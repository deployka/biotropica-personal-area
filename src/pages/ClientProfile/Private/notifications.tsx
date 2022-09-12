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

export const successCreateCommentNotification = () => {
  triggerNotification('Комментарий отправлен!', NotificationType.SUCCESS);
};

export const errorCreateCommentNotification = () => {
  triggerNotification('Ошибка отправки комментария!', NotificationType.DANGER);
};

export const successDeleteCommentNotification = () => {
  triggerNotification('Комментарий удален', NotificationType.SUCCESS);
};

export const errorDeleteCommentNotification = () => {
  triggerNotification('Ошибка удаления комментария', NotificationType.DANGER);
};
