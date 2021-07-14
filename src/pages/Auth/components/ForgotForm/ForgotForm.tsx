import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchForgotPassword } from '../../../../store/ducks/user/actionCreators';
import {
  ForgotPasswordData,
  SigninData,
} from '../../../../store/ducks/user/contracts/state';
import { selectUserStatus } from '../../../../store/ducks/user/selectors';
import s from './ForgotForm.module.scss';

interface Props {}

export const ForgotForm = (props: Props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<ForgotPasswordData>({
    email: '',
  });

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name;
    const value = e.target.value;
    setData(p => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      dispatch(fetchForgotPassword(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className={s.wrapper}>
      <input
        onChange={onChange}
        placeholder="Введите email"
        name="email"
        type="email"
      />
      <div className={s.btnWrapper}>
        <button>Отправить</button>
      </div>
    </form>
  );
};
