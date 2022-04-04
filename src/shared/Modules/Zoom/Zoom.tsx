import { ZoomMtg } from '@zoomus/websdk';
import React, { useEffect } from 'react';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../../services/EventBus';

import './Zoom.scss';

export type ZoomProps = {
  userName: string;
  leaveUrl: string;
  meetingNumber: string;
  passWord: string;
  signature: string;
  sdkKey: string;
};

export function Zoom({
  sdkKey,
  signature,
  meetingNumber,
  passWord,
  leaveUrl,
  userName,
}: ZoomProps) {
  const zoom = document.getElementById('zmmtg-root');

  useEffect(() => {
    if (!zoom) return;
    zoom.style.display = 'block';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: () => {
        ZoomMtg.join({
          userName,
          signature,
          sdkKey,
          meetingNumber,
          passWord,
          success: () => {
            eventBus.emit(EventTypes.notification, {
              title: 'Успешно!',
              message: 'Вы успешно вошли в конференцию!',
              type: NotificationType.SUCCESS,
            });
          },
          error: (error: unknown) => {
            console.error(error);
            eventBus.emit(EventTypes.notification, {
              message: 'Ошибка при входе, попробуйте еще раз!',
              type: NotificationType.DANGER,
            });
          },
        });
      },
      error: (error: unknown) => {
        console.error(error);
        eventBus.emit(EventTypes.notification, {
          message: 'Ошибка инициализации, попробуйте еще раз!',
          type: NotificationType.DANGER,
        });
      },
    });

    return () => {
      zoom.style.display = 'none';
    };
  });

  return null;
}
