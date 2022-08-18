import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../services/EventBus';
import { triggerNotification } from '../../utils/notifications';

export function successDeleteTariffNotification() {
  triggerNotification('Тариф успешно удален', NotificationType.SUCCESS);
}
export function errorDeleteTariffNotification() {
  triggerNotification('Ошибка удаления тарифа', NotificationType.DANGER);
}
export function successUpdateTariffNotification(name: string) {
  triggerNotification(`«${name}» успешно изменен`, NotificationType.SUCCESS);
}
export function errorUpdateTariffNotification(name: string) {
  triggerNotification(
    `Не удалось изменить «${name}», попробуйте еще раз`,
    NotificationType.DANGER,
  );
}

export function errorAddTariffNotification() {
  triggerNotification(
    'Не удалось добавить новый пакет, попробуйте еще раз',
    NotificationType.DANGER,
  );
}

export function successAddTariffNotification() {
  triggerNotification('Тариф успешно добавлен', NotificationType.SUCCESS);
}

export function successChangeTariffOrderNotification() {
  triggerNotification(
    'Порядок тарифов успешно обновлен',
    NotificationType.SUCCESS,
  );
}

export function errorChangeTariffOrderNotification() {
  triggerNotification('Ошибка обновления очереди', NotificationType.DANGER);
}
