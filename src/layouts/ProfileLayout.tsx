import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../pages/Profile/containers/Profile';
import { fetchUserData } from '../store/ducks/user/actionCreators';
import { selectCurrentUserData } from '../store/ducks/user/selectors';

interface Props {
  isAuth?: boolean;
}

export const ProfileLayout = ({ isAuth = true }: Props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUserData);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, isAuth]);

  return <>{user && <Profile user={user} />}</>;
};
