import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router';
import { useAppSelector } from '../store/rtk/storeHooks';
import { selectUserAccesses, selectUserRoles } from '../store/rtk/slices/authSlice';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/ducks/user/selectors';
import { PrivateLayout } from '../layouts/PrivateLayout';

type GuardRouteProps = {
    children: ReactNode;
    path: string;
    exact?: boolean;
    access?: string;
    roles?: string[];
}

export const GuardRoute = ({ children, access, roles = [], ...rest }: GuardRouteProps) => {
  const userAccesses = useSelector(selectUserAccesses);
  const userRoles = useSelector(selectUserRoles);
  const isAuth = useSelector(selectIsAuth);

  const isAllowed = access ? userAccesses.includes(access) : userRoles.some(it => roles.includes(it));

  console.log('isAllowed', isAllowed, userAccesses, access);

  if (!isAllowed) {
    return <Route
      {...rest}
      render={({ location }) =>
        <Redirect
          to={{
            pathname: isAuth ? '/signin' : '/signin',
            state: { from: location },
          }}
        />}
    />;
  }

  return <PrivateLayout>
    <Route
      {...rest}
      render={() => children}
    />
  </PrivateLayout>;
};
