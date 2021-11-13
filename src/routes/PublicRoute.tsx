import React from 'react';
import { Redirect, Route } from 'react-router';
import { Props } from './types';

export const PublicRoute = ({ children, isAuth, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
