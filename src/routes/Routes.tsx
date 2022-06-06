import React, { ElementType, ReactElement, Suspense } from 'react';

import { Route, Switch } from 'react-router';
import routes from './routesList';
import { Loader } from '../shared/Global/Loader/Loader';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { useSelector } from 'react-redux';
import {
  selectIsDoctor,
  selectIsAdmin,
  selectIsClient,
} from '../store/slices/authSlice';
import ErrorPage from '../pages/ErrorPage/containers/ErrorPage';

type Props = {
  DefaultComponent?: ElementType;
  Specialist?: ElementType;
  Client?: ElementType;
  Admin?: ElementType;
};

function RoleComponent({
  DefaultComponent,
  Client,
  Specialist,
  Admin,
}: Props): ReactElement {
  const isSpecialist = useSelector(selectIsDoctor);
  const isAdmin = useSelector(selectIsAdmin);
  const isClient = useSelector(selectIsClient);

  if (isSpecialist && Specialist) {
    return <Specialist />;
  } else if (isAdmin && Admin) {
    return <Admin />;
  } else if (isClient && Client) {
    return <Client />;
  } else if (DefaultComponent) {
    return <DefaultComponent />;
  }
  return <ErrorPage />;
}

export const Routes = () => {
  return (
    <Switch>
      <PrivateLayout>
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes.map(
              ({
                component: Component,
                specialistComponent: SpecialistComponent,
                adminComponent: AdminComponent,
                clientComponent: ClientComponent,
                path,
                exact,
              }) => (
                <Route path={`/${path}`} key={path} exact={exact}>
                  <RoleComponent
                    DefaultComponent={Component}
                    Client={ClientComponent}
                    Specialist={SpecialistComponent}
                    Admin={AdminComponent}
                  />
                </Route>
              ),
            )}
          </Switch>
        </Suspense>
      </PrivateLayout>
    </Switch>
  );
};
