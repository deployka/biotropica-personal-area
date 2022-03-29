import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

// libs styles
import 'react-notifications-component/dist/theme.css';
import 'swiper/swiper.scss';
import 'react-dates/lib/css/_datepicker.css';

import './styles/global.scss';

import { ModalProvider } from './providers/ModalProvider';
import './services/FirebaseService';
import { ZoomProvider } from './providers/ZoomProvider';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.3.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('ru-RU');
ZoomMtg.i18n.reload('ru-RU');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ModalProvider>
          <ReactNotifications />
          <ZoomProvider>
            <App />
          </ZoomProvider>
        </ModalProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
