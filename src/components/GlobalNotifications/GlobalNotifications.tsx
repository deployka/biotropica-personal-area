import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { notification } from '../../config/notification/notificationForm';
import { useQuery } from '../../hooks/useQuery';
import { eventBus, EventTypes } from '../../services/EventBus';
import { useAppSelector } from '../../store/storeHooks';
import { useGetNotificationsQuery } from '../../api/notifications';
import { toast } from 'react-toastify';
import { ToastProps } from 'react-toastify/dist/types';
import { selectIsAuthorized } from '../../store/slices/authSlice';

export enum NotificationType {
  DANGER = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}
export interface Notification extends Partial<ToastProps> {
  type: NotificationType;
  message: string | ReactNode;
  title?: string;
}

const GlobalNotifications = (): ReactElement => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const isAuth = useAppSelector(selectIsAuthorized);
  const { data: notifications = [] } = useGetNotificationsQuery();

  useEffect(() => {
    const message = query.get('message');
    const type = query.get('type') as NotificationType.INFO;

    if (message) {
      toast(decodeURI(message), {
        ...notification,
        type: type || NotificationType.INFO,
      });
      query.delete('message');
      query.delete('type');
      history.push(location.pathname + '?' + query.toString());
    }
  }, [location.search, query, history, location.pathname]);

  useEffect(() => {
    toast.dismiss('delete-notification');
  }, [location.pathname]);

  useEffect(() => {
    const getNotificationTitle = (type: NotificationType) => {
      switch (type) {
        case NotificationType.DANGER:
          return 'Произошла ошибка!';
        case NotificationType.SUCCESS:
          return 'Успешно!';
        case NotificationType.INFO:
        case NotificationType.WARNING:
          return 'Внимание!';
        default:
          break;
      }
    };

    function toastNotify(res: Notification) {
      const message = (
        <>
          {res.title && <h4 style={{ marginBottom: '5px' }}>{res.title}</h4>}
          {res.message && <p>{res.message}</p>}
        </>
      );
      toast(res?.message ? message : getNotificationTitle(res.type), {
        ...notification,
        ...res,
        type: res.type,
      });
    }

    function dismissNotify(id: number | string) {
      id && toast.dismiss(id);
    }

    eventBus.on(EventTypes.notification, toastNotify);
    eventBus.on(EventTypes.removeNotification, dismissNotify);

    return () => {
      eventBus.off(EventTypes.notification, toastNotify);
      eventBus.off(EventTypes.removeNotification, dismissNotify);
    };
  }, []);

  useEffect(() => {
    if (!isAuth) {
      return;
    }
    notifications.forEach(notification => {
      eventBus.emit(EventTypes.notification, {
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
        type: NotificationType.INFO,
      });
    });
  }, [history, isAuth]);

  return <></>;
};

export default GlobalNotifications;
