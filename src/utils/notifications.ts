import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../services/EventBus';

export function triggerNotification(message: string, type: NotificationType) {
  eventBus.emit(EventTypes.notification, {
    message,
    type,
  });
}
