import { iNotification } from 'react-notifications-component';

export const notification: iNotification = {
  insert: 'top',
  container: 'top-right',
  animationIn: ['animate__animated', 'animate__fadeInRight'],
  animationOut: ['animate__animated', 'animate__fadeOutRight'],
  dismiss: {
    pauseOnHover: true,
    duration: 7000,
    onScreen: true,
  },
};
