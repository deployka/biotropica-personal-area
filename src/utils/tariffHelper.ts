import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../services/EventBus';

export function showSuccessNotificationAfterDeleteTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `«${name}» успешно удален`,
    message: '',
    type: NotificationType.SUCCESS,
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

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

export function showSuccessNotificationAfterChangeTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `«${name}» успешно изменен`,
    message: '',
    type: NotificationType.SUCCESS,
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

export function showSuccessNotificationAfterAddTariff() {
  eventBus.emit(EventTypes.notification, {
    title: 'Тариф успешно добавлен',
    message: '',
    type: NotificationType.SUCCESS,
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}
