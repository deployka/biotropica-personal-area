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
import { ERROR_SERVER_CODES } from '../../../../../../constants/errors-server-list';
import Select from 'react-select';

import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MaskedInput from 'react-maskedinput';

import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

interface Props {
  user: User | undefined;
}

export interface ISelect {
  value: string;
  label: string;
}

export const EditProfileData = ({ user }: Props) => {
  const Styles = {
    control: (styles: any) => ({
      ...styles,
      borderRadius: 15,
      height: 50,
      border: '1px solid #9895a7',
      paddingLeft: 5,
    }),
  };

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

  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    userImage || ''
  );

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
      setDisabled(true);
    }

    if (
      (loadingStatus === LoadingStatus.SUCCESS ||
        loadingStatus === LoadingStatus.ERROR) &&
      response
    ) {
      setLoader(false);
      setTimeout(() => {
        dispatch(setUserResponse(undefined));
        history.push('/profile');
      }, 2500);
    }
    if (loadingStatus === LoadingStatus.SUCCESS) {
    }
  }, [loadingStatus, response]);

  async function onSubmit(values: UpdateUserData, options: any) {
    try {
      const data = {
        ...values,
        gender: values?.gender?.[0].label,
        dob: values?.dob?.toString().split('+')[0]?.trim(),
      };
      const formData = new FormData();
      for (let value in data) {
        //@ts-ignore
        formData.append(value, data[value]);
      }
      dispatch(fetchUpdateUser(formData));
    } catch (error) {}
  }

  function loadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const tgt = e.target;
    const files = tgt.files;

    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = function () {
        setImage(fr.result);
        refSetFieldValue.current('profile_photo', files[0]);
      };
      fr.readAsDataURL(files[0]);
    }
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return disabled || (!isValid && !dirty) || loader;
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
              className={classNames({
                [s.message__server]: true,
                [s.error__server]: ERROR_SERVER_CODES.includes(
                  response?.statusCode
                ),
                [s.success__server]: response?.statusCode === 200,
              })}
            >
              {response?.message}
            </div>

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
                  <input
                    className={classNames({
                      [s.input]: true,
                      [s.success__input]: touched.lastname && !errors.lastname,
                      [s.error__input]: touched.lastname && errors.lastname,
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Фамилия"
                    name="lastname"
                    value={values.lastname}
                    type="text"
                  />
                  {touched.lastname && errors.lastname && (
                    <span className={s.error}>{errors.lastname}</span>
                  )}
                </div>

                <div className={s.input__wrapper}>
                  <input
                    className={classNames({
                      [s.input]: true,
                      [s.success__input]: touched.name && !errors.name,
                      [s.error__input]: touched.name && errors.name,
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Имя"
                    name="name"
                    value={values.name}
                    type="text"
                  />

                  {touched.name && errors.name && (
                    <span className={s.error}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className={s.input__wrapper}>
                <input
                  className={classNames({
                    [s.input]: true,
                    [s.success__input]: touched.email && !errors.email,
                    [s.error__input]: touched.email && errors.email,
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  type="email"
                />
                {touched.email && errors.email && (
                  <span className={s.error}>{errors.email}</span>
                )}
              </div>

              <div className={s.input__wrapper}>
                <input
                  className={classNames({
                    [s.input]: true,
                    [s.success__input]:
                      touched.patronymic && !errors.patronymic,
                    [s.error__input]: touched.patronymic && errors.patronymic,
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Отчество"
                  name="patronymic"
                  value={values.patronymic}
                  type="text"
                />
                {touched.patronymic && errors.patronymic && (
                  <span className={s.error}>{errors.patronymic}</span>
                )}
              </div>

              <div className={s.input__wrapper}>
                <DatePicker
                  className={classNames({
                    [s.input]: true,
                    [s.success__input]: touched.dob && !errors.dob,
                    [s.error__input]: touched.dob && errors.dob,
                  })}
                  onChange={(date: Date) => setFieldValue('dob', date)}
                  onSelect={(date: Date) => setFieldValue('dob', date)}
                  onBlur={handleBlur}
                  name="dob"
                  locale={ru}
                  selected={values.dob}
                  showYearDropdown
                  yearDropdownItemNumber={150}
                  scrollableYearDropdown
                  maxDate={new Date()}
                  dateFormat={'P'}
                  customInput={
                    <MaskedInput mask="11.11.1111" placeholder="dd.mm.yyyy" />
                  }
                />
                {touched.dob && errors.dob && (
                  <span className={s.error}>{errors.dob}</span>
                )}
              </div>

              <div className={s.input__wrapper}>
                <input
                  className={classNames({
                    [s.input]: true,
                    [s.success__input]: touched.phone && !errors.phone,
                    [s.error__input]: touched.phone && errors.phone,
                  })}
                  onChange={handleChange}
                  onKeyDown={onPhoneKeyDown}
                  onInput={onPhoneInput}
                  onPaste={onPhonePaste}
                  onBlur={handleBlur}
                  placeholder="Телефон"
                  name="phone"
                  value={values.phone}
                  type="phone"
                />
                {touched.phone && errors.phone && (
                  <span className={s.error}>{errors.phone}</span>
                )}
              </div>

              <div className={s.input__wrapper}>
                <Select
                  onChange={e => {
                    setFieldValue('gender', [e]);
                  }}
                  placeholder="Выберите пол..."
                  onBlur={handleBlur}
                  styles={Styles}
                  name="gender"
                  value={(values.gender?.[0].label && values.gender) || null}
                  options={options}
                />
                {touched.gender && errors.gender && (
                  <span className={s.error}>{errors.gender}</span>
                )}
              </div>
            </div>

            <div className={s.button__wrapper}>
              <button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                className={classNames({
                  [s.btn]: true,
                  [s.disabled]: isDisabled(isValid, dirty),
                })}
              >
                {loader ? <Loader /> : 'Сохранить'}
              </button>

              <Link to="/profile">
                <button
                  className={classNames({
                    [s.btn]: true,
                    [s.btn__discard]: true,
                  })}
                >
                  Отменить
                </button>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
