import React, { ReactElement, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import { Loader } from './shared/Global/Loader/Loader';

import { Routes } from './routes/Routes';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

import Signin from './pages/Auth/containers/Signin';
import Signup from './pages/Auth/containers/Signup';
import RestorePassword from './pages/Auth/containers/RestorePassword';
import CreatePassword from './pages/Auth/containers/CreatePassword';
import ForgotPassword from './pages/Auth/containers/ForgotPassword';

import GlobalNotifications from './components/GlobalNotifications/GlobalNotifications';
import Policy from './pages/Policy/containers/Policy';
import { ProfileLayout } from './layouts/ProfileLayout';
import { useCurrentUserQuery } from './api/user';
import { selectIsAuthorized } from './store/slices/authSlice';
import { useAppSelector } from './store/storeHooks';

function App(): ReactElement {
  const { isLoading: userDataLoading } = useCurrentUserQuery();

  const isAuth = useAppSelector(selectIsAuthorized);

  // const getGlobalLoading = useSelector(selectGlobalLoadingStatus);
  const globalLoading = false;

  if (userDataLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      {globalLoading && <Loader />}
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
