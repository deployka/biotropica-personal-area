import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import './styles/global.scss';
import { ErrorPage } from './pages/404/containers/404';
import { Calendar } from './pages/Calendar/containers/Calendar';
import { Goals } from './pages/Goals/containers/Goals';
import { Home } from './pages/Home/containers/Home';
import { Profile } from './pages/Profile/containers/Profile';
import { Questionnaire } from './pages/Questionnaire/containers/Questionnaire';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuth,
  selectUserLoadingStatus,
} from './store/ducks/user/selectors';
import { SigninForm } from './pages/Auth/components/SigninForm/SigninForm';
import { SignupForm } from './pages/Auth/components/SignupForm/SignupForm';
import { fetchUserData } from './store/ducks/user/actionCreators';
import { RestoreForm } from './pages/Auth/components/RestoreForm/RestoreForm';
import { ForgotForm } from './pages/Auth/components/ForgotForm/ForgotForm';
import { Loader } from './shared/Loader/Loader';
import { LoadingStatus } from './store/types';
import { Sidebar } from './shared/Sidebar/Sidebar';

function App() {
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState<boolean>(false);

  const currentPath = location.pathname;
  const authPaths = ['/signin', '/signup'];

  useEffect(() => {
    dispatch(fetchUserData());
  }, [isAuth]);

  useEffect(() => {
    if (authPaths.includes(currentPath)) {
      history.push('/');
    } else if (loadingStatus === LoadingStatus.SUCCESS && isAuth && redirect) {
      history.push(currentPath);
    }
  }, [isAuth, loadingStatus]);

  console.log(loadingStatus);

  if (
    loadingStatus === LoadingStatus.LOADING ||
    loadingStatus === LoadingStatus.NEVER
  ) {
    return <Loader />;
  }

  if (!isAuth) {
    return (
      <Switch>
        <Route exact path="/signin">
          <SigninForm setRedirect={setRedirect} />
        </Route>

        <Route exact path="/signup">
          <SignupForm setRedirect={setRedirect} />
        </Route>

        <Route exact path="/restore-password" component={RestoreForm} />

        <Route exact path="/forgot-password" component={ForgotForm} />

        <Route render={() => <Redirect to="/signin" />} />
      </Switch>
    );
  }

  return (
    <>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/questionnaire" component={Questionnaire} />

        <Route exact path="/calendar" component={Calendar} />

        <Route exact path="/profile" component={Profile} />

        <Route path="/goals" component={Goals} />

        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
