import React, { useState, Suspense } from 'react';

import { Route, Switch } from 'react-router';
import routes from './routesList';
import { Loader } from '../shared/Global/Loader/Loader';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { useSelector } from 'react-redux';
import { selectIsDoctor, selectUserRoles } from '../store/rtk/slices/authSlice';

export const Routes = () => {
  const isDoctor = useSelector(selectIsDoctor);
  return (
    <Switch>
      <PrivateLayout>
        <Suspense fallback={<Loader/>}>
          <Switch>
            {routes.map(({ component: Component, specialistComponent: SpecialistComponent, path, exact }) => (
              <Route path={`/${path}`} key={path} exact={exact}>
                {isDoctor && SpecialistComponent ? <SpecialistComponent/> : <Component/>}
              </Route>
            ))}
          </Switch>
        </Suspense>
      </PrivateLayout>
    </Switch>
  );
};
