import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import MaskedInput from 'react-maskedinput';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
import { notification } from '../../../../config/notification/notificationForm';
import { Button } from '../../../../shared/Form/Button/Button';
import { DatePickerCustom } from '../../../../shared/Form/DatePicker/DatePickerCustom';
import { Input } from '../../../../shared/Form/Input/Input';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Calendar } from '../../../../shared/Global/Сalendar/Calendar';
import {
  deleteGoalData,
  setGoalResponse,
  updateGoalData,
} from '../../../../store/ducks/goal/actionCreators';
import { Goal, GoalValue } from '../../../../store/ducks/goal/contracts/state';
import {
  selectGoalData,
  selectGoalLoadingStatus,
  selectGoalResponse,
} from '../../../../store/ducks/goal/selectors';
import { LoadingStatus } from '../../../../store/types';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { registerLocale } from 'react-datepicker';

import ru from 'date-fns/locale/ru';
import { validationSchema } from './validationSchema';
import s from './ProgressForm.module.scss';
import { fetchGoalsData } from '../../../../store/ducks/goals/actionCreators';

registerLocale('ru', ru);

interface Props {}

export const ProgressForm = ({}: Props) => {
  const goal: Goal | undefined = useSelector(selectGoalData);

  const [progressBarOptions, setProgressBarOptions] = useState({
    width: 120,
    height: 120,
    circleWidth: 8,
    gradientStartColor: '#6F61D0',
    gradientStopColor: '#C77EDF',
    bgColor: '#F7F6FB',
    progressValue: 0,
  });

  const calendar = {
    month: 'Август',
    year: '1993',
  };

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectGoalLoadingStatus);
  const response = useSelector(selectGoalResponse);
  const history = useHistory();

  const [name, setName] = useState<string>('');
  const [deleted, setDeleted] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [visibleDeleteNot, setVisibleDeleteNot] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);
  const refResetForm = useRef<any>(null);

  useEffect(() => {
    // if (progressBarOptions.progressValue >= 100) {
    //   dispatch(updateGoalData({ id: goal?.id, completed: true }));
    // }

    if (goal) {
      const max: number = parseInt(goal.end_result);
      const min: number = parseInt(goal.start_result);
      const progressValue =
        parseInt(goal?.values?.[goal?.values?.length - 1]?.value) || min;

      setProgressBarOptions({
        ...progressBarOptions,
        progressValue: Math.floor((progressValue * 100) / max),
      });
    }
  }, [goal]);

  useEffect(() => {
    setVisibleDeleteNot(false);
    store.removeNotification('delete-notification');
  }, [goal]);

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
    if (loadingStatus === LoadingStatus.SUCCESS && update) {
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
      setUpdate(false);
    }
  }, [loadingStatus, update]);

  useEffect(() => {
    if (deleted && loadingStatus === LoadingStatus.SUCCESS) {
      dispatch(fetchGoalsData());
      store.addNotification({
        ...notification,
        title: `Цель «${name}» успешно удалена!`,
        message: 'Чтобы закрыть это уведомление, нажмите на него',
        type: 'success',
        dismiss: {
          duration: 10000,
        },
      });
      history.push('/goals');
      setDeleted(false);
    }
  }, [goal, deleted, loadingStatus]);

  async function onSubmit(values: GoalValue, options: any) {
    refResetForm.current = options.resetForm;
    setName(goal?.name || '');
    setUpdate(true);
    try {
      dispatch(
        updateGoalData({
          id: goal?.id,
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

  function deleteGoal() {
    if (!goal) return;
    setName(goal?.name || '');
    if (visibleDeleteNot) {
      return;
    }
    setVisibleDeleteNot(true);
    store.addNotification({
      ...notification,
      title: `Удалить цель «${goal?.name}»?`,
      message: (
        <>
          <Button
            style={{
              marginRight: '20px',
              color: '#fff',
              marginBottom: '5px',
              marginTop: '5px',
              border: '1px solid #fff',
            }}
            name="discard"
            onClick={() => {
              setDeleted(true);
              dispatch(deleteGoalData(goal?.id));
              setVisibleDeleteNot(false);
            }}
            options={{
              content: 'Удалить',
              width: '100px',
              height: '30px',
              classes: { discard: true },
            }}
          />
          <Button
            style={{
              marginBottom: '5px',
              marginTop: '5px',
              background: '#fff',
              color: '#000',
            }}
            onClick={() => {
              setDeleted(false);
              setVisibleDeleteNot(false);
            }}
            options={{
              content: 'Отмена',
              width: '100px',
              height: '30px',
            }}
          />
        </>
      ),
      type: 'danger',
      dismiss: false,
      id: 'delete-notification',
      onRemoval: () => {
        setVisibleDeleteNot(false);
      },
    });
  }

  return (
    <>
      <div className={s.progress__form}>
        <ProgressBar options={progressBarOptions} />
        {/* <Calendar options={calendar} /> */}
        <div className={s.edit__goal}>
          <GlobalSvgSelector id="edit" />
          <Link to={`/goals/edit/${goal?.id}`}>
            <div className={s.edit__goal__text}>редактировать цель</div>
          </Link>
        </div>

        <div className={s.edit__goal} onClick={deleteGoal}>
          <GlobalSvgSelector id="delete-card" />
          <div className={s.edit__goal__text}>Удалить цель</div>
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
    </>
  );
};
