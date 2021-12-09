import React, {useEffect, useState} from 'react';
import {store} from 'react-notifications-component';
import {useHistory, useLocation} from 'react-router';
import {notification} from '../../config/notification/notificationForm';
import {useQuery} from '../../hooks/useQuery';
import NotificationService from "../../services/NotificationService";

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
                type: 'info'
            });
            query.delete('message');
            history.push(location.pathname + '?' + query.toString());
        }
    }, [location.search]);

    useEffect(() => {
        NotificationService.getNow().then(
            (nowNotifications) => {
                console.log(nowNotifications);
                nowNotifications.forEach(notification => {
                    store.addNotification({
                        container: 'top-right',
                        message: <div>{notification.message}
                            <button
                                style={{marginLeft: '10px'}}
                                onClick={() => history.push(notification.link)}
                            >
                                перейти
                            </button>
                        </div>,
                        type: 'default',
                    });
                })
            }
        )
    }, [])

    useEffect(() => {
        store.removeNotification('delete-notification');
    }, [location.pathname]);
    return <></>;
};

export default GlobalNotifications;
