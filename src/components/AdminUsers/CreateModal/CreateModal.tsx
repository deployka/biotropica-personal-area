import React, { Dispatch, SetStateAction, useState } from 'react';

import { ROLE, Role } from '../../../@types/entities/Role';
import Modal from '../../../shared/Global/Modal/Modal';
import { CreateUserDto } from '../../../@types/dto/users/create-user.dto';
import { Formik } from 'formik';
import { Loader } from '../../../shared/Form/Loader/Loader';
import { Input } from '../../../shared/Form/Input/Input';
import { Button } from '../../../shared/Form/Button/Button';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../utils/phoneValidator';

import {
  ISelect,
  SelectCustom,
} from '../../../shared/Form/Select/SelectCustom';
import { validationSchema } from './validationSchema';
import closeIcon from './../../../assets/icons/close.svg';
import s from './CreateUserModal.module.scss';

interface Props {
  setPopup: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  popup: boolean;
  roles: Role[];
  onUserCreate(user: CreateUserDto): void;
}

const selectOptions: ISelect<ROLE>[] = [
  {
    label: 'Клиент',
    value: ROLE.CLIENT,
  },
  {
    label: 'Тренер',
    value: ROLE.TRAINER,
  },
  {
    label: 'Администратор',
    value: ROLE.ADMIN,
  },
];

export const CreateUserModal = ({
  onUserCreate,
  popup,
  setPopup,
  isLoading,
}: Props) => {
  function closePopUp() {
    setPopup(false);
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || isLoading;
  }

  return (
    <Modal isOpened={popup} close={closePopUp}>
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          email: '',
          phone: '',
          roles: [ROLE.TRAINER],
        }}
        validateOnBlur
        onSubmit={onUserCreate}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          setFieldValue,
          handleSubmit,
          dirty,
        }) => (
          <div className={s.form}>
            <h2 className={s.header}>
              <div className={s.title}>Создание пользователя</div>
              <div className={s.closeIcon}>
                <img onClick={closePopUp} src={closeIcon} />
              </div>
            </h2>

            <div className={s.divider}></div>

            <div className={s.inputsLine}>
              <div className={s.inputWrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Имя"
                  name="name"
                  value={values.name}
                  type="name"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.inputWrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Фамилия"
                  name="lastname"
                  value={values.lastname}
                  type="text"
                  options={{ touched, errors }}
                />
              </div>
            </div>

            <div className={s.inputsLine}>
              <div className={s.inputWrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  type="email"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.inputWrapper}>
                <Input
                  onChange={handleChange}
                  onKeyDown={onPhoneKeyDown}
                  onInput={onPhoneInput}
                  onPaste={onPhonePaste}
                  onBlur={handleBlur}
                  placeholder="Телефон"
                  name="phone"
                  value={values.phone}
                  type="phone"
                  options={{ touched, errors }}
                />
              </div>
            </div>

            <div className={s.inputsLine}>
              <div className={s.inputWrapper}>
                <SelectCustom
                  value={selectOptions.find(
                    option => option.value === values.roles[0],
                  )}
                  options={selectOptions}
                  name="roles"
                  placeholder="Роль"
                  onBlur={handleBlur}
                  settings={{
                    touched,
                    errors,
                  }}
                  onChange={(selected: ISelect<ROLE>) => {
                    setFieldValue('roles', [selected.value]);
                  }}
                />
              </div>
            </div>

            <div className={s.inputWrapper}>
              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: isLoading ? <Loader /> : 'Создать пользователя',
                  setDisabledStyle: isDisabled(isValid, dirty),
                  width: '100%',
                  height: '50px',
                }}
              />
            </div>
          </div>
        )}
      </Formik>
    </Modal>
  );
};
