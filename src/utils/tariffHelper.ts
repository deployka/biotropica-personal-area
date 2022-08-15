import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../services/EventBus';

export function showSuccessNotificationAfterDeleteTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `«${name}» успешно удален`,
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function showErrorNotificationAfterDeleteTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Не получилось удалить «${name}», попробуйте еще раз`,
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}

export function showErrorNotificationAfterChangeTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Не удалось изменить «${name}», попробуйте еще раз`,
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}

export function showSuccessNotificationAfterChangeTariff(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `«${name}» успешно изменен`,
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function showErrorNotificationAfterAddTariff() {
  eventBus.emit(EventTypes.notification, {
    title: 'Не удалось добавить новый пакет, попробуйте еще раз',
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}

export function showSuccessNotificationAfterAddTariff() {
  eventBus.emit(EventTypes.notification, {
    title: 'Тариф успешно добавлен',
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function showSuccessNotificationAfterUpdateOrders() {
  eventBus.emit(EventTypes.notification, {
    title: 'Порядок тарифов успешно обновлен',
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function showErrorNotificationAfterUpdateOrders() {
  eventBus.emit(EventTypes.notification, {
    title: 'Ошибка обновления очереди',
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}
