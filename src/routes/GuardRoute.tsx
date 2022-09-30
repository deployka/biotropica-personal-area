import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router';
import { selectUserAccesses, selectUserRoles } from '../store/slices/authSlice';
import { useSelector } from 'react-redux';
import { PrivateLayout } from '../layouts/PrivateLayout';

type GuardRouteProps = {
  children: ReactNode;
  path: string;
  exact?: boolean;
  access?: string;
  roles?: string[];
};

export const GuardRoute = ({
  children,
  access,
  roles = [],
  ...rest
}: GuardRouteProps) => {
  const userAccesses = useSelector(selectUserAccesses);
  const userRoles = useSelector(selectUserRoles);

  const isAllowed = access
    ? userAccesses.includes(access)
    : userRoles.some(it => roles.includes(it.name));

  if (!isAllowed) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return (
    <PrivateLayout>
      <Route {...rest} render={() => children} />
    </PrivateLayout>
  );
};
