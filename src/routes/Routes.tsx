import React, { useState, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import routes from './routesList';
import { Loader } from '../shared/Global/Loader/Loader';
import { PrivateLayout } from '../layouts/PrivateLayout';

export const Routes = () => {
  return (
    <Switch>
      <PrivateLayout>
        <Suspense fallback={<Loader/>}>
          <Switch>
            {routes.map(({ component: Component, path, exact }) => (
              <Route path={`/${path}`} key={path} exact={exact}>
                <Component/>
              </Route>
            ))}
          </Switch>
        </Suspense>
      </PrivateLayout>
    </Switch>
  );
};
