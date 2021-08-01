import classNames from 'classnames';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Loader } from '../../../../../../shared/Form/Loader/Loader';
import {
  fetchUpdateUser,
  setUserResponse,
} from '../../../../../../store/ducks/user/actionCreators';
import {
  UpdateUserData,
  User,
} from '../../../../../../store/ducks/user/contracts/state';
import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../../../../store/types';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../../../../utils/phoneValidator';

import s from './EditProfileData.module.scss';
import { validationSchema } from './validationSchema';

import camera from '../../../../../../assets/icons/forms/camera.svg';

import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MaskedInput from 'react-maskedinput';

import ru from 'date-fns/locale/ru';
import { Input } from '../../../../../../shared/Form/Input/Input';
import { DatePickerCustom } from '../../../../../../shared/Form/DatePicker/DatePickerCustom';
import { Button } from '../../../../../../shared/Form/Button/Button';
import { SelectCustom } from '../../../../../../shared/Form/Select/SelectCustom';

import { store } from 'react-notifications-component';
import { notification } from '../../../../../../config/notification/notificationForm';

registerLocale('ru', ru);

interface Props {
  user: User | undefined;
}

export interface ISelect {
  value: string;
  label: string;
}

export const EditProfileData = ({ user }: Props) => {
  const options = [
    { value: 'Мужской', label: 'Мужской' },
    { value: 'Женский', label: 'Женский' },
  ];

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const response = useSelector(selectUserResponse);
  const history = useHistory();
  const refSetFieldValue = useRef<any>(null);

  const userImage =
    user?.profile_photo &&
    process.env.REACT_APP_BACKEND_URL + '/' + user?.profile_photo;

  const [loader, setLoader] = useState<boolean>(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    userImage || ''
  );

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }

    if (loadingStatus === LoadingStatus.ERROR && response) {
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message,
        type: 'danger',
      });
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS && response) {
      store.addNotification({
        ...notification,
        title: 'Успешно!',
        message: response?.message,
        type: 'success',
      });
      setLoader(false);
      dispatch(setUserResponse(undefined));
      history.push('/profile');
    }
  }, [loadingStatus, response]);

  async function onSubmit(values: UpdateUserData, options: any) {
    try {
      const data: any = {
        ...values,
        gender: values?.gender?.[0].label,
        dob: values?.dob?.toString().split('+')[0]?.trim(),
      };
      const formData = new FormData();
      for (let value in data) {
        formData.append(value, data[value]);
      }
      dispatch(fetchUpdateUser(formData));
    } catch (error) {}
  }

  function loadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const tgt = e.target;
    const files = tgt.files;
    const permittedPaths = ['image/png', 'image/jpeg', 'image/gif'];

    if (
      FileReader &&
      files &&
      files.length &&
      permittedPaths.includes(files?.[0]?.type)
    ) {
      store.removeNotification('avatar_type_error');
      const fr = new FileReader();
      fr.onload = function () {
        setImage(fr.result);

        refSetFieldValue.current('profile_photo', files[0]);
      };
      fr.readAsDataURL(files[0]);
    } else {
      store.addNotification({
        ...notification,
        title: 'Фото профиля не обновлено!',
        message: 'Допустимые типы изображения: png, jpg, gif',
        type: 'danger',
        id: 'avatar_type_error',
        dismiss: {
          duration: 7000,
          onScreen: true,
        },
      });
    }
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  return (
    <div className={s.edit__password}>
      <Formik
        initialValues={{
          profile_photo: '',
          lastname: user?.lastname || '',
          name: user?.name || '',
          email: user?.email || '',
          gender: [{ value: user?.gender || '', label: user?.gender || '' }],
          patronymic: user?.patronymic || '',
          phone: user?.phone || '',
          dob: !user?.dob ? null : new Date(user?.dob || ''),
          id: user?.id,
        }}
        validateOnBlur
        onSubmit={(values: UpdateUserData, options) =>
          onSubmit(values, options)
        }
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
          setFieldValue,
        }) => (
          <form
            name="user_data"
            onSubmit={e => e.preventDefault()}
            className={s.form}
          >
            <div
              style={{
                backgroundImage: `url(${image})`,
              }}
              className={classNames({
                [s.image__loader__wrapper]: true,
                [s.error__image__wrapper]:
                  touched.profile_photo && errors.profile_photo,
              })}
            >
              <input
                type="file"
                name="profile_photo"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={e => {
                  refSetFieldValue.current = setFieldValue;
                  loadAvatar(e);
                }}
              />
              <img src={camera} alt="photo" />
              <span>Изменить</span>
            </div>

            <div className={s.text__inputs__wrapper}>
              <div className={s.small__input__wrapper}>
                <div className={s.input__wrapper}>
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

                <div className={s.input__wrapper}>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Имя"
                    name="name"
                    value={values.name}
                    type="text"
                    options={{ touched, errors }}
                  />
                </div>
              </div>

              <div className={s.input__wrapper}>
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

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Отчество"
                  name="patronymic"
                  value={values.patronymic}
                  type="text"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <DatePickerCustom
                  onChange={(date: Date) => setFieldValue('dob', date)}
                  onSelect={(date: Date) => setFieldValue('dob', date)}
                  onBlur={handleBlur}
                  name="dob"
                  locale={ru}
                  selected={values.dob}
                  showYearDropdown
                  scrollableYearDropdown
                  maxDate={new Date()}
                  dateFormat={'P'}
                  options={{
                    touched,
                    errors,
                    label: 'Дата рождения',
                    yearDropdownItemNumber: 150,
                    customInput: (
                      <MaskedInput mask="11.11.1111" placeholder="dd.mm.yyyy" />
                    ),
                  }}
                />
              </div>

              <div className={s.input__wrapper}>
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

              <div className={s.input__wrapper}>
                <SelectCustom
                  onChange={(e: any) => {
                    setFieldValue('gender', [e]);
                  }}
                  placeholder="Выберите пол..."
                  onBlur={handleBlur}
                  name="gender"
                  value={(values.gender?.[0].label && values.gender) || null}
                  options={options}
                  settings={{ touched, errors }}
                />
              </div>
            </div>

            <div className={s.button__wrapper}>
              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: loader ? <Loader /> : 'Сохранить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                }}
              />

              <Link to="/profile">
                <Button
                  options={{
                    classes: { discard: true },
                    content: 'Отмена',
                  }}
                />
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
