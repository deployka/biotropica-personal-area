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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ReactNotification />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
