import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSignup } from '../../../../store/ducks/user/actionCreators';
import { SignupData } from '../../../../store/ducks/user/contracts/state';
import s from './SignupForm.module.scss';

interface Props {
  setRedirect: Dispatch<SetStateAction<boolean>>;
}

export const SignupForm = ({ setRedirect }: Props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<SignupData>({
    email: '',
    password: '',
    verification_password: '',
    name: '',
    lastname: '',
    phone: '',
  });

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name;
    const value = e.target.value;
    setData(p => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      dispatch(fetchSignup(data));
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
        <input
          onChange={onChange}
          placeholder="подтвердите пароль"
          name="verification_password"
          type="password"
        />
        <input onChange={onChange} placeholder="имя" name="name" type="text" />
        <input
          onChange={onChange}
          placeholder="фамилия"
          name="lastname"
          type="text"
        />
        <input
          onChange={onChange}
          placeholder="телефон"
          name="phone"
          type="text"
        />
        <div className={s.btnWrapper}>
          <button>Зарегистрироваться</button> или{' '}
          <Link to="/signin">Войти</Link>
          <Link to="/forgot-password">Забыли пароль</Link>
        </div>
      </form>
    </>
  );
};
