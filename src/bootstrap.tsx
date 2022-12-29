import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { ZoomMtg } from '@zoomus/websdk';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

// libs styles
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/swiper.scss';
import 'react-dates/lib/css/_datepicker.css';

import './styles/global.scss';

import { ModalProvider } from './providers/ModalProvider';
import './services/FirebaseService';

// ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av');

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// // loads language files, also passes any error messages to the ui
// ZoomMtg.i18n.load('en-US');
// ZoomMtg.i18n.reload('en-US');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ToastContainer />
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
