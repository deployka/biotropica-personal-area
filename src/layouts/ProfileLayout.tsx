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

export const ProfileLayout = ({ isAuth }: Props) => {
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

  return (
    <>
      {isAuth ? (
        <Profile isPublic={isAuth} user={user} />
      ) : (
        <div className="container" style={{ marginTop: '100px' }}>
          <Profile isPublic={isAuth} user={user} />
        </div>
      )}
    </>
  );
};
