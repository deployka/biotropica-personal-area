import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/global.scss';
import { ErrorPage } from './pages/404/containers/404';
import { Calendar } from './pages/Calendar/containers/Calendar';
import { Goals } from './pages/Goals/containers/Goals';
import { Home } from './pages/Home/containers/Home';
import { Profile } from './pages/Profile/containers/Profile';
import { Questionnaire } from './pages/Questionnaire/containers/Questionnaire';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/questionnaire" component={Questionnaire} />

      <Route exact path="/calendar" component={Calendar} />

      <Route exact path="/profile" component={Profile} />

      <Route path="/goals" component={Goals} />

      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;
