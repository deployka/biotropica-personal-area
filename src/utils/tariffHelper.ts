import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../services/EventBus';

export function showErrorNotificationAfterDeleteTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Не получилось удалить «${name}», попробуйте еще раз`,
    message: '',
    type: NotificationType.DANGER,
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showErrorNotificationAfterChangeTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Не удалось изменить «${name}», попробуйте еще раз`,
    message: '',
    type: NotificationType.DANGER,
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showErrorNotificationAfterAddTariff() {
  eventBus.emit(EventTypes.notification, {
    title: 'Не удалось добавить новый пакет, попробуйте еще раз',
    message: '',
    type: NotificationType.DANGER,
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}
