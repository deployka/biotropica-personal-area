import React, { Dispatch, SetStateAction, useState } from 'react';

import s from './CreateUserModal.module.scss';
import { CreateUserInput } from './CreateUserInput';
import { CreateUserSelect } from './CreateUserSelect';

import { BaseUser } from '../../../@types/entities/BaseUser';
import { Role } from '../../../@types/entities/Role';
import Modal from '../../../shared/Global/Modal/Modal';
import Button from '../../Button/Button';

interface Props {
  setPopup: Dispatch<SetStateAction<boolean>>;
  popup: boolean;
  roles: Role[];

  onUserCreate(user: Partial<BaseUser>): void;
}

type UserEditable = Pick<
  BaseUser,
  'name' | 'lastname' | 'email' | 'phone' | 'roles'
>;

export const CreateUserModal = (props: Props) => {
  const [user, setUser] = useState<UserEditable>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    roles: [],
  });

  function closePopUp() {
    props.setPopup(false);
  }

  function setUserField<
    K extends keyof UserEditable,
    V extends UserEditable[K],
  >(key: K, value: V) {
    setUser({
      ...user,
      [key]: value,
    });
  }

  function create() {
    props.onUserCreate(user);
  }

  function roleChangeHandler(id: number) {
    const foundRole = props.roles.find(it => it.id === id);
    if (foundRole) {
      return setUserField('roles', [foundRole.name]);
    }
  }

  return (
    <Modal isOpened={props.popup} close={closePopUp}>
      <form className={s.popup}>
        <div className={s.title}>
          <h2>Новый пользователь</h2>
        </div>
        <div className={s.divider} />
        <div className={s.inputs}>
          <CreateUserInput
            value={user.name}
            title="Имя"
            placeholder="Иван"
            onChange={val => setUserField('name', val)}
          />
          <CreateUserInput
            value={user.lastname}
            title="Фамилия"
            placeholder="Иванов"
            onChange={val => setUserField('lastname', val)}
          />
          <CreateUserInput
            value={user.email}
            title="Электронный адрес"
            type="email"
            placeholder="ivan@gmail.com"
            onChange={val => setUserField('email', val)}
          />
          <CreateUserInput
            value={user.phone}
            title="Номер телефона"
            type="phone"
            placeholder="+7 999 999 99 99"
            onChange={val => setUserField('phone', val)}
          />
          <CreateUserSelect
            title="Роль"
            value={user.roles[0]}
            placeholder="Роль"
            options={props.roles.map(it => ({ label: it.name, value: it.id }))}
            onChange={roleChangeHandler}
          />
        </div>
        <div className={s.btns}>
          <Button type="button" className={s.saveBtn} onClick={closePopUp}>
            Отмена
          </Button>
          <Button type="button" onClick={create}>
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};
