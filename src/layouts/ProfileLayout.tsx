import React, { useEffect } from 'react';
import { useCurrentUserQuery } from '../api/user';
import Profile from '../pages/Profile/Public/Profile';

interface Props {
  isAuth?: boolean;
}

export const ProfileLayout = ({ isAuth = true }: Props) => {
  const { data: user } = useCurrentUserQuery();

  return <>{user && <Profile user={user} />}</>;
};
