import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSignin } from '../../../../store/ducks/user/actionCreators';
import { SigninData } from '../../../../store/ducks/user/contracts/state';
import { selectUserStatus } from '../../../../store/ducks/user/selectors';
import s from './SigninForm.module.scss';

interface Props {}

export const SigninForm = (props: Props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<SigninData>({
    email: '',
    password: '',
  });

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name;
    const value = e.target.value;
    setData(p => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      dispatch(fetchSignin(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className={s.wrapper}>
      <input
        onChange={onChange}
        placeholder="email"
        name="email"
        type="email"
      />
      <input
        onChange={onChange}
        placeholder="пароль"
        name="password"
        type="password"
      />
      <div className={s.btnWrapper}>
        <button>Войти</button> или <Link to="/signup">Зарегистрироваться</Link>
        <Link to="/forgot-password">Забыли пароль</Link>
      </div>
    </form>
  );
};
