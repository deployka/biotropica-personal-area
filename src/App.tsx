import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './styles/global.scss';
import { ErrorPage } from './pages/404/containers/404';
import { Calendar } from './pages/Calendar/containers/Calendar';
import { Goals } from './pages/Goals/containers/Goals';
import { Home } from './pages/Home/containers/Home';
import { Profile } from './pages/Profile/containers/Profile';
import { Questionnaire } from './pages/Questionnaire/containers/Questionnaire';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from './store/ducks/user/selectors';
import { SigninForm } from './pages/Auth/components/SigninForm/SigninForm';
import { SignupForm } from './pages/Auth/components/SignupForm/SignupForm';
import { fetchUserData } from './store/ducks/user/actionCreators';
import { RestoreForm } from './pages/Auth/components/RestoreForm/RestoreForm';
import { ForgotForm } from './pages/Auth/components/ForgotForm/ForgotForm';

function App() {
  const isAuth = useSelector(selectIsAuth);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    const requiredPaths = [
      '/signup',
      '/signin',
      '/restore-password',
      '/forgot-password',
    ];

    if (requiredPaths.includes(location.pathname.split('?')[0])) {
      history.push(location.pathname + location.search);
    } else if (!isAuth) {
      history.push('/signin');
    } else {
      history.push('/');
    }
  }, [isAuth]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/signin" component={SigninForm} />

      <Route exact path="/signup" component={SignupForm} />

      <Route exact path="/restore-password" component={RestoreForm} />

      <Route exact path="/forgot-password" component={ForgotForm} />

      <Route exact path="/questionnaire" component={Questionnaire} />

      <Route exact path="/calendar" component={Calendar} />

      <Route exact path="/profile" component={Profile} />

      <Route path="/goals" component={Goals} />

      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;
