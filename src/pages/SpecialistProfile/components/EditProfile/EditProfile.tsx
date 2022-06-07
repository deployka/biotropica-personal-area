import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

import s from './EditProfile.module.scss';

import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../../utils/phoneValidator';
import Button from '../../../../components/Button/Button';
import DatePicker from '../../../../components/DatePicker/DatePickerCustom';
import SelectCustom from '../../../../components/Select/SelectCustom';
import Input, { InputTypes } from '../../../../components/Input/Input';
import { FormsSvgSelector } from '../../../../assets/icons/FormsSvgSelector';
import validationSchema from './editProfileValidation';

import MultiSelect from '../../../../components/MultiSelect/MultiSelect';
// import { showErrorMessage, showSuccessMessage } from '../../../../components/notification/messages';
import { Loader } from '../../../../shared/Global/Loader/Loader';

import { getMediaLink } from '../../../../utils/mediaHelper';
import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';
import {
  useCurrentUserQuery,
  useUpdateUserMutation,
} from '../../../../api/user';
import { useGetSpecializationListQuery } from '../../../../api/specializations';
import { useRequestAddAvatarMutation } from '../../../../api/avatar';
import { useChangeSpecialistDataMutation } from '../../../../api/specialists';
import { Specialization } from '../../../../@types/entities/Specialization';

type Option = { label: string; value: number };

const EditProfile = () => {
  const history = useHistory();
  const {
    data: user,
    isLoading: isGetUserLoading,
    isSuccess: isGetUserSuccess,
    refetch: refetchUserData,
  } = useCurrentUserQuery();

  const { data: specializations } = useGetSpecializationListQuery();

  const [image, setImage] = useState<string | ArrayBuffer | null>('');

  const specializationOptions = (specializations || []).map(it => ({
    label: it.title,
    value: it.id.toString(),
  }));

  React.useEffect(() => {
    isGetUserSuccess &&
      !!user.profilePhoto &&
      setImage(getMediaLink(user.profilePhoto) || defaultAvatar);
  }, [isGetUserSuccess]);

  const [file, setFile] = useState<File>();

  const onAvatarLoaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tgt = e.target;
    const files = tgt.files;
    const permittedPaths = ['image/png', 'image/jpeg', 'image/gif'];

    if (
      FileReader &&
      files &&
      files.length &&
      permittedPaths.includes(files?.[0]?.type)
    ) {
      if (Number((files[0].size / (1024 * 1024)).toFixed(2)) < 5) {
        const fr = new FileReader();

        fr.onload = function () {
          setImage(fr.result);
          setFile(files[0]);
        };

        fr.readAsDataURL(files[0]);
      } else {
        // TODO:
        // showErrorMessage('Максимальный размер файла: 5мб');
      }
    } else {
      // showErrorMessage('Допустимые типы изображения: png, jpg, gif');
    }
  };

  const [
    requestAddAvatar,
    {
      isLoading: isAddAvatarLoading,
      isSuccess: isAddAvatarSuccess,
      isError: isAddAvatarError,
    },
  ] = useRequestAddAvatarMutation();

  const [
    requestUpdateUserData,
    {
      isSuccess: isUpdateUserSuccess,
      isLoading: isUpdateUserLoading,
      isError: isUpdateUserError,
    },
  ] = useUpdateUserMutation();

  const [
    requestChangeSpecialistData,
    {
      isSuccess: isChangeSpecialistSuccess,
      isLoading: isChangeSpecialistLoading,
      isError: isChangeSpecialistError,
    },
  ] = useChangeSpecialistDataMutation();

  React.useEffect(() => {
    if (isUpdateUserSuccess) {
      refetchUserData();
    }

    if (isAddAvatarError) {
      // showErrorMessage('Не удалось добавить аватар, пожалуйста попробуйте снова');
    }

    if (isUpdateUserError || isChangeSpecialistError) {
      // showErrorMessage('Что-то пошло не так, попробуйте снова');
    }

    if (isUpdateUserSuccess && isChangeSpecialistSuccess) {
      if (file) {
        if (isAddAvatarSuccess) {
          history.push('/profile/' + user?.id);
        }
      } else {
        history.push('/profile/' + user?.id);
      }
    }
  }, [
    isUpdateUserSuccess,
    isChangeSpecialistSuccess,
    isUpdateUserError,
    isChangeSpecialistError,
    isAddAvatarSuccess,
    isAddAvatarError,
    isAddAvatarLoading,
  ]);

  const translatedGender: Record<string, string> = {
    male: 'Мужской',
    female: 'Женский',
  };

  const selectGender: { value: string; label: string }[] = Object.keys(
    translatedGender,
  ).map((key: string) => {
    return {
      value: key,
      label: translatedGender[key],
    };
  });

  const handleSubmit = (values: any, file?: File) => {
    let specializations = values.specializations;

    if (
      specializations.length !== 0 &&
      typeof specializations[0].label === 'string'
    ) {
      specializations = specializations.map((spec: any) => spec.value);
    }

    let gender = values.gender;

    if (gender !== 'male' || gender !== 'female') {
      gender = gender.value;
    }

    if (!user) return;

    requestUpdateUserData({
      id: user.id,
      name: values.name,
      email: values.email,
      phone: values.phone,
      lastname: values.lastname,
      patronymic: values.patronymic,
      dob: values.dob,
      gender: gender,
    });

    requestChangeSpecialistData({
      specializations: specializations,
      experience: values.experience,
      education: values.education,
    });

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      requestAddAvatar(formData);
    }
  };

  return (
    <>
      {isGetUserLoading ? (
        <Loader />
      ) : (
        <>
          {(isUpdateUserLoading ||
            isChangeSpecialistLoading ||
            isUpdateUserLoading ||
            isChangeSpecialistLoading ||
            isAddAvatarLoading) && <Loader />}
          <div className={s.edit__password}>
            <Formik
              initialValues={{
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
                lastname: user?.lastname,
                profilePhoto: user?.profilePhoto,
                patronymic: user?.patronymic || '',
                dob: user?.dob ? new Date(user.dob) : null,
                specializations: user?.specializations,
                experience: user?.experience,
                education: user?.education,
                gender: user?.gender,
              }}
              validateOnBlur
              onSubmit={values => handleSubmit(values, file)}
              validationSchema={validationSchema}
            >
              {({
                dirty,
                values,
                isValid,
                touched,
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
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
                      // [s.error__image__wrapper]:
                      //   touched.profilePhoto && errors.profilePhoto,
                    })}
                  >
                    <input
                      type="file"
                      name="profilePhoto"
                      accept=".png, .jpg, .jpeg, .gif"
                      onChange={(e: any) => {
                        setFieldValue('profilePhoto', e.currentTarget.files[0]);
                        onAvatarLoaded(e);
                      }}
                    />
                    <FormsSvgSelector id="camera" />
                    <span>Изменить</span>
                  </div>
                  <div className={s.text__inputs__wrapper}>
                    <div className={s.small__input__wrapper}>
                      <div className={s.input__wrapper}>
                        <Input
                          name="lastname"
                          placeholder="Фамилия"
                          label="Фамилия"
                          value={values.lastname}
                          type={InputTypes.LAST_NAME}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={s.input__wrapper}>
                        <Input
                          name="name"
                          placeholder="Имя"
                          label="Имя"
                          value={values.name}
                          type={InputTypes.NAME}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className={s.input__wrapper}>
                      <Input
                        name="patronymic"
                        label="Отчество"
                        placeholder="Отчество"
                        value={values.patronymic}
                        type={InputTypes.PATRONYMIC}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={s.input__wrapper}>
                      <Input
                        name="email"
                        placeholder="Почта"
                        label="Почта"
                        value={values.email}
                        type={InputTypes.EMAIL}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={s.input__wrapper}>
                      <DatePicker
                        name="dob"
                        maxDate={new Date()}
                        selected={values.dob}
                        label={'Дата рождения'}
                        onBlur={handleBlur}
                        onChange={(date: Date) => setFieldValue('dob', date)}
                        onSelect={(date: Date) => setFieldValue('dob', date)}
                      />
                    </div>
                    <div className={s.input__wrapper}>
                      <Input
                        name="experience"
                        placeholder="Опыт работы"
                        label="Опты работы"
                        value={values.experience}
                        type={InputTypes.TEXT}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={s.input__wrapper}>
                      <SelectCustom
                        name="gender"
                        label="Выберите пол"
                        placeholder="Выберите пол"
                        //FIXME:
                        options={selectGender as any}
                        value={values.gender}
                        onBlur={handleBlur}
                        onChange={value => {
                          setFieldValue('gender', value);
                        }}
                        touched={!!touched.gender}
                        error={errors.gender}
                      />
                    </div>
                    <div className={s.input__wrapper}>
                      <Input
                        name="phone"
                        placeholder="Телефон"
                        label="Телефон"
                        type={InputTypes.PHONE}
                        value={values.phone}
                        onBlur={handleBlur}
                        onPaste={onPhonePaste}
                        onInput={onPhoneInput}
                        onChange={handleChange}
                        onKeyDown={onPhoneKeyDown}
                      />
                    </div>
                    <div className={s.input__wrapper}>
                      <Input
                        name="education"
                        placeholder="Образование"
                        label="Образование"
                        value={values.education}
                        type={InputTypes.TEXT}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={s.input__wrapper}>
                      <MultiSelect
                        name="specializations"
                        placeholder="Специальность"
                        options={specializationOptions}
                        value={values.specializations?.map(
                          (it: Specialization) =>
                            specializationOptions.find(
                              so => so.value === it.id.toString(),
                            ),
                        )}
                        onBlur={handleBlur}
                        onChange={(option: Option[]) => {
                          setFieldValue(
                            'specializations',
                            option.map((item: Option) =>
                              specializations?.find(s => s.id === +item.value),
                            ),
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className={s.button__wrapper}>
                    <Button className={s.cancelBtn}>
                      <Link to={'/profile/' + user?.id}>Отмена</Link>
                    </Button>
                    <Button
                      type="submit"
                      className={s.submitBtn}
                      isPrimary
                      isDisabled={!(isValid && dirty)}
                      onClick={() => handleSubmit()}
                    >
                      Сохранить
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
