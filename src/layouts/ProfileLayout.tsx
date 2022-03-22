import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Profile from '../pages/Profile/containers/Profile';
import {
  fetchUserData,
  fetchUserDataById,
} from '../store/ducks/user/actionCreators';
import { selectUserData } from '../store/ducks/user/selectors';

interface Params {
  id: string;
}

interface Props {
  isAuth?: boolean;
}

export const ProfileLayout = ({ isAuth = true }: Props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);

  const { id } = useParams<Params>();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUserData());
    } else {
      dispatch(fetchUserDataById(+id));
    }
  }, []);

  return <>{user && <Profile user={user} />}</>;
};
