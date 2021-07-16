import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignout } from '../../../store/ducks/user/actionCreators';
import {
  selectIsAuth,
  selectUserData,
} from '../../../store/ducks/user/selectors';

interface Props {}

export const Home = (props: Props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUserData);
  async function logout() {
    dispatch(fetchSignout());
  }
  return (
    <div>
      Home {user?.email} {''}
      {isAuth && <button onClick={logout}> Выйти</button>}
    </div>
  );
};
