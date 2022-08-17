import { NotificationType } from '../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../services/EventBus';

export function successDeleteTariffNotification() {
  eventBus.emit(EventTypes.notification, {
    title: 'Тариф успешно удален',
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function errorDeleteTariffNotification() {
  eventBus.emit(EventTypes.notification, {
    title: 'Ошибка удаления тарифа',
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}

export function successUpdateTariffNotification(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `Не удалось изменить «${name}», попробуйте еще раз`,
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}

export function errorUpdateTariffNotification(name: string) {
  eventBus.emit(EventTypes.notification, {
    title: `«${name}» успешно изменен`,
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function errorAddTariffNotification() {
  eventBus.emit(EventTypes.notification, {
    title: 'Не удалось добавить новый пакет, попробуйте еще раз',
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}

export function successAddTariffNotification() {
  eventBus.emit(EventTypes.notification, {
    title: 'Тариф успешно добавлен',
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function successChangeTariffOrderNotification() {
  eventBus.emit(EventTypes.notification, {
    title: 'Порядок тарифов успешно обновлен',
    message: '',
    type: NotificationType.SUCCESS,
    autoClose: 5000,
  });
}

export function errorChangeTariffOrderNotification() {
  eventBus.emit(EventTypes.notification, {
    title: 'Ошибка обновления очереди',
    message: '',
    type: NotificationType.DANGER,
    autoClose: 5000,
  });
}
