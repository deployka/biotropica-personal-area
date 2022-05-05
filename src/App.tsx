import React, { ReactElement, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Loader } from './shared/Global/Loader/Loader';

import { fetchUserData } from './store/ducks/user/actionCreators';
import { fetchGoalsData } from './store/ducks/goals/actionCreators';

import { selectIsAuth } from './store/ducks/user/selectors';
import { Routes } from './routes/Routes';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

import Signin from './pages/Auth/containers/Signin';
import Signup from './pages/Auth/containers/Signup';
import RestorePassword from './pages/Auth/containers/RestorePassword';
import CreatePassword from './pages/Auth/containers/CreatePassword';
import ForgotPassword from './pages/Auth/containers/ForgotPassword';

import GlobalNotifications from './components/GlobalNotifications/GlobalNotifications';
import { selectGlobalLoadingStatus } from './store/selectors';
import Policy from './pages/Policy/containers/Policy';
import { useRequestUserDataQuery } from './store/rtk/requests/user';
import { ProfileLayout } from './layouts/ProfileLayout';

function App(): ReactElement {
  const dispatch = useDispatch();
  const { isLoading: userDataLoading } = useRequestUserDataQuery();

  const isAuth = useSelector(selectIsAuth);
  const getGlobalLoading = useSelector(selectGlobalLoadingStatus);

  useEffect(() => {
    dispatch(fetchUserData());
    if (isAuth) {
      dispatch(fetchGoalsData());
    }
  }, [isAuth, dispatch]);

  if (userDataLoading) {
    return <Loader />;
  }
  
  return (
    <Suspense fallback={<Loader />}>
      {getGlobalLoading && <Loader />}
      {<GlobalNotifications />}
      <Switch>
        <PublicRoute path="/signin" isAuth={isAuth}>
          <Signin />
        </PublicRoute>
        <PublicRoute path="/signup" isAuth={isAuth}>
          <Signup />
        </PublicRoute>
        <PublicRoute path="/forgot-password" isAuth={isAuth}>
          <ForgotPassword />
        </PublicRoute>
        <PublicRoute path="/restore-password" isAuth={isAuth}>
          <RestorePassword />
        </PublicRoute>
        <PublicRoute path="/create-password" isAuth={isAuth}>
          <CreatePassword />
        </PublicRoute>
        <PublicRoute path="/policy" isAuth={isAuth}>
          <Policy />
        </PublicRoute>
        <PublicRoute path="/users/:id/tabs/:active" isAuth={isAuth}>
          <ProfileLayout isAuth={isAuth} />
        </PublicRoute>

        <PrivateRoute path="/" isAuth={isAuth}>
          <Routes />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
}
export default App;
