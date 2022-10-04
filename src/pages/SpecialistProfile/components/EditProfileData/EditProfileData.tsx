import React from 'react';
import classNames from 'classnames';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../../utils/phoneValidator';
import { validationSchema } from './validationSchema';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MaskedInput from 'react-maskedinput';
import { Input } from '../../../../shared/Form/Input/Input';
import { DatePickerCustom } from '../../../../shared/Form/DatePicker/DatePickerCustom';
import { Button } from '../../../../shared/Form/Button/Button';
import {
  ISelect,
  SelectCustom,
} from '../../../../shared/Form/Select/SelectCustom';
import { FormsSvgSelector } from '../../../../assets/icons/forms/FormsSvgSelector';
import ru from 'date-fns/locale/ru';
import { useMobile } from '../../../../hooks/useMobile';
import { BaseUser } from '../../../../@types/entities/BaseUser';
import s from './EditProfileData.module.scss';
import MultiSelect from '../../../../components/MultiSelect/MultiSelect';
import { InputTypes } from '../../../../components/Input/Input';
import { useGetSpecializationListQuery } from '../../../../api/specializations';
import { SpecialistData } from '../../Profile';
import { Specialization } from '../../../../@types/entities/Specialization';
import { Option } from 'react-select/src/filters';
import { UpdateUserDto } from '../../../../@types/dto/users/update.dto';
import { UpdateSpecialistDto } from '../../../../@types/dto/specialists/update.dto';

registerLocale('ru', ru);

interface Props {
  userData: BaseUser;
  specialistData: SpecialistData;
  isLoading: boolean;
  profilePhoto: string | ArrayBuffer | null;
  options: ISelect<string>[];
  onAvatarLoaded: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) => void;
  onSubmit: (values: UpdateUserDto & UpdateSpecialistDto) => void;
}

export const EditProfileData = ({
  userData,
  specialistData,
  isLoading,
  profilePhoto,
  options,
  onAvatarLoaded,
  onSubmit,
}: Props) => {
  // TODO: вынести из компонента
  const { data: specializations } = useGetSpecializationListQuery();

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || isLoading;
  }

  function getDateByUTC(date: Date) {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
  }

  const specializationOptions = (specializations || []).map(it => ({
    label: it.title,
    value: it.id.toString(),
  }));

  const isMobile = useMobile();

  return (
    <div className={s.edit__password}>
      <Formik
        initialValues={{
          profilePhoto: userData?.profilePhoto || null,
          lastname: userData?.lastname || '',
          name: userData?.name || '',
          email: userData?.email || '',
          gender: options.find(gender => gender.value === userData.gender)
            ?.value,
          patronymic: userData?.patronymic || '',
          phone: userData?.phone || '',
          dob: userData?.dob,
          id: Number(userData?.id),
          experience: specialistData?.experience || '',
          specializations: specialistData?.specializations,
          education: specialistData?.education || '',
        }}
        validateOnBlur
        onSubmit={onSubmit}
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
                backgroundImage: `url(${profilePhoto})`,
              }}
              className={classNames({
                [s.image__loader__wrapper]: true,
                [s.error__image__wrapper]:
                  touched.profilePhoto && errors.profilePhoto,
              })}
            >
              <input
                type="file"
                name="profilePhoto"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={e => {
                  onAvatarLoaded(e, setFieldValue);
                }}
              />
              <FormsSvgSelector id="camera" />
              <span>Изменить</span>
            </div>

            <div className={s.text__inputs__wrapper}>
              <div className={s.small__input__wrapper}>
                <div className={s.input__wrapper}>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Фамилия"
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
                    label="Имя"
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
                  label="Отчество"
                  name="patronymic"
                  value={values.patronymic}
                  type="text"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Email"
                  name="email"
                  value={values.email}
                  type="email"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <DatePickerCustom
                  onChange={(date: Date) =>
                    setFieldValue('dob', date ? getDateByUTC(date) : null)
                  }
                  onSelect={(date: Date) =>
                    setFieldValue('dob', date ? getDateByUTC(date) : null)
                  }
                  onBlur={handleBlur}
                  name="dob"
                  locale={ru}
                  withPortal={isMobile}
                  selected={(values?.dob && new Date(values?.dob)) || null}
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
                  label="Телефон"
                  name="phone"
                  value={values.phone}
                  type="phone"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <SelectCustom
                  onChange={(selectedGender: ISelect<string>) => {
                    setFieldValue('gender', selectedGender.value);
                  }}
                  placeholder="Выберите пол..."
                  onBlur={handleBlur}
                  name="gender"
                  value={options.find(gender => gender.value === values.gender)}
                  options={options}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  name="experience"
                  label="Опыт работы"
                  value={values.experience}
                  type={InputTypes.TEXT}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className={s.input__wrapper}>
                <Input
                  name="education"
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
                  value={values.specializations?.map((it: Specialization) =>
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
              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: isLoading ? <Loader /> : 'Сохранить',
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
