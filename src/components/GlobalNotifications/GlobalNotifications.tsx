import React, { useEffect } from 'react';
import { store } from 'react-notifications-component';
import { useHistory, useLocation } from 'react-router';
import { notification } from '../../config/notification/notificationForm';
import { useQuery } from '../../hooks/useQuery';

const GlobalNotifications = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const message = query.get('message');
    if (message) {
      store.addNotification({
        ...notification,
        title: 'Внимание!',
        message: decodeURI(message),
        type: 'info',
      });
      history.push(location.pathname);
    }
  }, [location.search]);

  useEffect(() => {
    store.removeNotification('delete-notification');
  }, [location.pathname]);
  return <></>;
};

export default GlobalNotifications;
