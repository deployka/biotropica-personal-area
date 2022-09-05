import React, { useEffect } from 'react';
import { useCurrentUserQuery } from '../../api/user';
import ClientProfilePrivate from '../../pages/ClientProfile/Private/Private';

export const PrivateProfileLayout = () => {
  const { data: user } = useCurrentUserQuery();

  return <>{user && <ClientProfilePrivate user={user} />}</>;
};
