import React, { ReactElement, ReactNode, useEffect } from 'react';
import { ReactNotificationOptions, store } from 'react-notifications-component';
import { useHistory, useLocation } from 'react-router';
import { notification } from '../../config/notification/notificationForm';
import { useQuery } from '../../hooks/useQuery';
import { eventBus, EventTypes } from '../../services/EventBus';
import NotificationService from '../../services/NotificationService';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/ducks/user/selectors';

export enum NotificationType {
  DANGER = 'danger',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  DEFAULT = 'default',
}
export interface Notification extends Partial<ReactNotificationOptions> {
  type: NotificationType;
  message: string | ReactNode;
  title?: string;
}

const GlobalNotifications = (): ReactElement => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    const message = query.get('message');
    if (message) {
      store.addNotification({
        ...notification,
        title: 'Внимание!',
        message: decodeURI(message),
        type: NotificationType.INFO,
      });
      query.delete('message');
      history.push(location.pathname + '?' + query.toString());
    }
  }, [location.search, query, history, location.pathname]);

  useEffect(() => {
    store.removeNotification('delete-notification');
  }, [location.pathname]);

  useEffect(() => {
    const getNotificationTitle = (type: NotificationType) => {
      switch (type) {
        case NotificationType.DANGER:
          return 'Произошла ошибка!';
        case NotificationType.SUCCESS:
          return 'Успешно!';
        case NotificationType.DEFAULT:
        case NotificationType.INFO:
        case NotificationType.WARNING:
          return 'Внимание!';
        default:
          break;
      }
    };
    eventBus.on(EventTypes.notification, res => {
      store.addNotification({
        ...notification,
        ...res,
        title: res.title ? res.title : getNotificationTitle(res.type),
        message: res?.message || 'Нет сообщения',
        type: res.type,
      });
    });

    eventBus.on(EventTypes.removeNotification, (id: string) => {
      store.removeNotification(id);
    });
  }, []);

  useEffect(() => {
    if (!isAuth) {
      return;
    }
    NotificationService.getNow().then(nowNotifications => {
      nowNotifications.forEach(notification => {
        eventBus.emit(EventTypes.notification, {
          container: 'top-right',
          message: (
            <div>
              {notification.message}
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => history.push(notification.link)}
              >
                перейти
              </button>
            </div>
          ),
          type: NotificationType.DEFAULT,
        });
      });
    });
  }, [isAuth]);

  return <></>;
};

export default GlobalNotifications;
