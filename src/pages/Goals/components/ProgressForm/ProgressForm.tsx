import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import MaskedInput from 'react-maskedinput';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
import { notification } from '../../../../config/notification/notificationForm';
import { Button } from '../../../../shared/Form/Button/Button';
import { DatePickerCustom } from '../../../../shared/Form/DatePicker/DatePickerCustom';
import { Input } from '../../../../shared/Form/Input/Input';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Calendar } from '../../../../shared/Global/Сalendar/Calendar';
import {
  setGoalResponse,
  updateGoalData,
} from '../../../../store/ducks/goal/actionCreators';
import {
  Goal,
  GoalValue,
  UpdateGoalData,
} from '../../../../store/ducks/goal/contracts/state';
import {
  selectGoalLoadingStatus,
  selectGoalResponse,
} from '../../../../store/ducks/goal/selectors';
import { selectGoalsData } from '../../../../store/ducks/goals/selectors';
import { LoadingStatus } from '../../../../store/types';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { registerLocale } from 'react-datepicker';

import ru from 'date-fns/locale/ru';
import { validationSchema } from './validationSchema';
import s from './ProgressForm.module.scss';

registerLocale('ru', ru);

interface Props {
  goal: Goal;
}

export const ProgressForm = ({ goal }: Props) => {
  const progressBarOptions = {
    width: 120,
    height: 120,
    circleWidth: 8,
    gradientStartColor: '#6F61D0',
    gradientStopColor: '#C77EDF',
    bgColor: '#F7F6FB',
    progressValue: 56,
  };
  const calendar = {
    month: 'Август',
    year: '1993',
  };

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectGoalLoadingStatus);
  const response = useSelector(selectGoalResponse);
  const history = useHistory();
  const goals: Goal[] = useSelector(selectGoalsData) || [];

  const [name, setName] = useState<string>('');

  const [loader, setLoader] = useState<boolean>(false);
  const refResetForm = useRef<any>(null);

  useEffect(() => {
    if (refResetForm.current) {
    }
  }, [goals, history]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (loadingStatus === LoadingStatus.ERROR && refResetForm.current) {
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message || 'Произошла непредвиденная ошибка',
        type: 'danger',
      });
    }
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS && refResetForm.current) {
      store.addNotification({
        ...notification,
        title: `Цель «${name}» успешно обновлена!`,
        message:
          'Не забывайте регулярно отмечать свой прогресс в достижении цели',
        type: 'info',
        dismiss: false,
      });
      dispatch(setGoalResponse(undefined));
      refResetForm.current();
    }
  }, [loadingStatus]);

  async function onSubmit(values: GoalValue, options: any) {
    refResetForm.current = options.resetForm;
    setName(goal.name || '');
    try {
      dispatch(
        updateGoalData({
          id: goal.id,
          values: [values],
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  return (
    <div className={s.progress__form}>
      <ProgressBar options={progressBarOptions} />
      {/* <Calendar options={calendar} /> */}
      <div className={s.edit__goal}>
        <GlobalSvgSelector id="edit" />
        <Link to={`/goals/edit/${goal.id}`}>
          <div className={s.edit__goal__text}>редактировать цель</div>
        </Link>
      </div>
      <div className={s.progress__form__title}>
        Сообщите нам о вашем прогрессе
      </div>

      <Formik
        initialValues={{
          value: '',
          createdAt: new Date(),
        }}
        validateOnBlur
        onSubmit={(values: GoalValue, options) => onSubmit(values, options)}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={s.form}>
            <div className={s.input__wrapper}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Текущий результат"
                name="value"
                value={values?.value}
                type="text"
                options={{ touched, errors }}
              />
            </div>

            <div className={s.input__wrapper}>
              <DatePickerCustom
                onChange={(date: Date) => setFieldValue('createdAt', date)}
                onSelect={(date: Date) => setFieldValue('createdAt', date)}
                onBlur={handleBlur}
                name="createdAt"
                locale={ru}
                selected={values?.createdAt}
                showYearDropdown
                scrollableYearDropdown
                maxDate={new Date()}
                dateFormat={'P'}
                options={{
                  touched,
                  errors,
                  label: 'Введите дату',
                  yearDropdownItemNumber: 150,
                  customInput: (
                    <MaskedInput mask="11.11.1111" placeholder="dd.mm.yyyy" />
                  ),
                }}
              />
            </div>

            <div className={s.buttons}>
              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: loader ? <Loader /> : 'Добавить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                  width: '100%',
                  height: '49px',
                }}
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
