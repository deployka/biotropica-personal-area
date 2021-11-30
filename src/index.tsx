import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

//libs styles
import 'react-notifications-component/dist/theme.css';
import 'swiper/swiper.scss';
import 'react-dates/lib/css/_datepicker.css';

import './styles/global.scss';

import { ModalProvider } from './providers/ModalProvider';
import './services/FirebaseService';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ModalProvider>
          <ReactNotification />
          <App />
        </ModalProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
