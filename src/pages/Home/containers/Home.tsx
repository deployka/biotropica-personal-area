import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSignout } from '../../../store/ducks/user/actionCreators';

interface Props {}

export const Home = (props: Props) => {
  const dispatch = useDispatch();
  async function logout() {
    dispatch(fetchSignout());
  }
  return (
    <div>
      Home
      <button onClick={logout}>Выйти</button>
    </div>
  );
};
