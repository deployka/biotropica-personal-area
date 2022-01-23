import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDDLqebPaXkj6S3sj1XMxz-0pt-PxWg6-U',
  authDomain: 'biotropika-01.firebaseapp.com',
  projectId: 'biotropika-01',
  storageBucket: 'biotropika-01.appspot.com',
  messagingSenderId: '822782535539',
  appId: '1:822782535539:web:2e750714e6522fa20a8706',
  measurementId: 'G-9DJWWP4XQJ',
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

getToken(messaging, { vapidKey: process.env.FB_VAPID_KEY })
  .then(currentToken => {
    if (currentToken) {
      console.log('currentToken', currentToken);
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.',
      );
      // ...
    }
  })
  .catch(err => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

onMessage(messaging, payload => {
  console.log('Message received. ', payload);
  // ...
});
