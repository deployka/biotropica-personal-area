import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  fetchRestorePassword,
  fetchSignin,
} from '../../../../store/ducks/user/actionCreators';
import {
  RestorePasswordData,
  SigninData,
} from '../../../../store/ducks/user/contracts/state';
import { selectUserStatus } from '../../../../store/ducks/user/selectors';
import s from './RestoreForm.module.scss';

interface Props {}

export const RestoreForm = (props: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const restoreToken = location.search.split('token=')[1];

  const [data, setData] = useState<RestorePasswordData>({
    password: '',
    verification_password: '',
    restoreToken,
  });

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name;
    const value = e.target.value;
    setData(p => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      dispatch(fetchRestorePassword(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className={s.wrapper}>
      <input
        onChange={onChange}
        placeholder="пароль"
        name="password"
        type="password"
      />
      <input
        onChange={onChange}
        placeholder="подтвердите пароль"
        name="verification_password"
        type="password"
      />
      <div className={s.btnWrapper}>
        <button>Создать новый пароль</button>
      </div>
    </form>
  );
};
