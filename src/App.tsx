import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { ErrorPage } from './pages/404/containers/404';
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
import {
  fetchUserData,
  setUserLoadingStatus,
  setUserResponse,
} from './store/ducks/user/actionCreators';
import { RestoreForm } from './pages/Auth/components/RestoreForm/RestoreForm';
import { ForgotForm } from './pages/Auth/components/ForgotForm/ForgotForm';
import { Loader } from './shared/Global/Loader/Loader';
import { LoadingStatus } from './store/types';
import { Sidebar } from './shared/Global/Sidebar/Sidebar';
import { Tariffs } from './pages/Tariffs/containers/Tariffs';
import { Services } from './pages/Services/containers/Services';
import { Header } from './shared/Global/Header/Header';

import './styles/global.scss';

function App() {
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState<boolean>(false);
  const [page, setPage] = useState<string>('Главная');

  const currentPath = location.pathname;
  const authPaths = ['/signin', '/signup'];

  useEffect(() => {
    dispatch(fetchUserData());
  }, [isAuth]);

  useEffect(() => {
    dispatch(setUserLoadingStatus(LoadingStatus.LOADED));
    dispatch(setUserResponse(undefined));
  }, [location.pathname]);

  useEffect(() => {
    if (isAuth && authPaths.includes(currentPath)) {
      history.push('/');
    } else if (loadingStatus === LoadingStatus.SUCCESS && isAuth && redirect) {
      history.push(currentPath);
      setRedirect(false);
    }
  }, [isAuth, loadingStatus]);

  function getLoading() {
    return (
      loadingStatus === LoadingStatus.LOADING ||
      loadingStatus === LoadingStatus.NEVER
    );
  }

  if (!isAuth) {
    return (
      <>
        {getLoading() && <Loader />}
        <div className="auth__container">
          <Switch>
            <Route exact path="/signin">
              <SigninForm setRedirect={setRedirect} />
            </Route>

            <Route exact path="/signup">
              <SignupForm
                loadingStatus={loadingStatus}
                setRedirect={setRedirect}
              />
            </Route>

            <Route exact path="/forgot-password">
              <ForgotForm loadingStatus={loadingStatus} />
            </Route>

            <Route exact path="/restore-password">
              <RestoreForm loadingStatus={loadingStatus} />
            </Route>

            <Route render={() => <Redirect to="/signin" />} />
          </Switch>
        </div>
      </>
    );
  }

  return (
    <>
      {getLoading() && <Loader />}
      <Sidebar setPage={setPage} />
      <Header page={page} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/questionnaire" component={Questionnaire} />

          <Route exact path="/profile" component={Profile} />

          <Route path="/goals" component={Goals} />

          <Route path="/tariffs" component={Tariffs} />

          <Route path="/services" component={Services} />

          <Route component={ErrorPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
