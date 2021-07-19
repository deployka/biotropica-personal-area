import React from 'react';
import { User } from '../../../../store/ducks/user/contracts/state';

import s from './Card.module.scss';

interface Props {
  user: User;
}

export const Card = ({ user }: Props) => {
  return (
    <div className={s.profile__card}>
      <div className={s.profile__avatar}>
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          alt=""
        />
      </div>
      <div className={s.profile__name}>
        <p>{user.name}</p>
      </div>
      <div className={s.profile__mail}>
        <p>{user.email}</p>
      </div>
      <div className={s.profile__phone}>
        <p>{user.phone}</p>
      </div>
      <div className={s.profile__birth}>
        <p>{user.dob}</p>
      </div>
      <div className={s.profile__edit}>
        <div className={s.profile__editIcon}>
          <img src="./images/icons/Edit.svg" alt="" />
        </div>
        <a href="#">редактировать</a>
      </div>
    </div>
  );
};
