import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Profile from '../pages/Profile/containers/Profile';
import { fetchUserData } from '../store/ducks/user/actionCreators';
import { useRequestUserDataQuery } from '../store/rtk/requests/user';

interface Props {
  isAuth?: boolean;
}

export const ProfileLayout = ({ isAuth = true }: Props) => {
  const dispatch = useDispatch();

  const { data: user } = useRequestUserDataQuery();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, isAuth]);

  return <>{user && <Profile user={user} />}</>;
};
