import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Profile from '../pages/Profile/containers/Profile';
import {
  fetchUserData,
  fetchUserDataById,
} from '../store/ducks/user/actionCreators';
import { selectUserData } from '../store/ducks/user/selectors';

interface Props {
  isAuth?: boolean;
}

export const ProfileLayout = ({ isAuth = true }: Props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);

  const { id } = useParams<{id: string}>();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUserData());
    } else {
      dispatch(fetchUserDataById(+id));
    }
  }, [dispatch, isAuth, id]);

  return <>{user && <Profile user={user} />}</>;
};
