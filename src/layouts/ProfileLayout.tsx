import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCurrentUserQuery } from '../api/user';
import Profile from '../pages/Profile/containers/Profile';

interface Props {
  isAuth?: boolean;
}

export const ProfileLayout = ({ isAuth = true }: Props) => {
  const { data: user } = useCurrentUserQuery();

  return <>{user && <Profile user={user} />}</>;
};
