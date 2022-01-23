import React, { useEffect, useRef, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import MaskedInput from 'react-maskedinput';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
import { Button } from '../../../../shared/Form/Button/Button';
import { DatePickerCustom } from '../../../../shared/Form/DatePicker/DatePickerCustom';
import { Input } from '../../../../shared/Form/Input/Input';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import {
  deleteGoalData,
  setGoalResponse,
  updateGoalData,
} from '../../../../store/ducks/goal/actionCreators';
import {
  Goal,
  GoalType,
  GoalUnits,
  GoalValue,
  RunUnits,
} from '../../../../store/ducks/goal/contracts/state';
import {
  selectGoalData,
  selectGoalLoadingStatus,
} from '../../../../store/ducks/goal/selectors';
import { LoadingStatus } from '../../../../store/types';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { registerLocale } from 'react-datepicker';

import ru from 'date-fns/locale/ru';
import { validationSchema } from './validationSchema';
import s from './ProgressForm.module.scss';
import { fetchGoalsData } from '../../../../store/ducks/goals/actionCreators';
import { ISelect } from '../../../../shared/Form/Select/SelectCustom';
import { eventBus, EventTypes } from '../../../../services/EventBus';
import { NotificationType } from '../../../../components/GlobalNotifications/GlobalNotifications';

registerLocale('ru', ru);

export const ProgressForm = () => {
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

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectGoalLoadingStatus);
  const history = useHistory();

  const [name, setName] = useState<string>('');
  const [deleted, setDeleted] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [visibleDeleteNot, setVisibleDeleteNot] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);
  const refResetForm = useRef<(() => void) | null>(null);

  function getMaxValueFromGoalValues(): number {
    const values = goal?.values?.map(value => parseInt(value?.value)) || [];
    values.push(parseInt(goal?.startResult || '', 10));
    return Math.max(...values);
  }

  function getProgressValueByTypeAndUnit(
    type: GoalType,
    units: ISelect<Partial<GoalUnits> | null>[],
  ): number {
    switch (type) {
      case GoalType.RUN:
        switch (units[0].value) {
          case RunUnits.KILOMETER:
          case RunUnits.MINUTES:
          case RunUnits.MINUTES_KILOMETER:
            return getMaxValueFromGoalValues();
        }
        break;
      case GoalType.WEIGHT:
        return parseInt(goal?.values?.[0]?.value || goal?.startResult || '');
      case GoalType.FORCE:
        return getMaxValueFromGoalValues();
      default:
        break;
    }
    return 0;
  }

  useEffect(() => {
    if (progressBarOptions.progressValue >= 100 && !goal?.completed) {
      setName(goal?.name || '');
      dispatch(updateGoalData({ id: goal?.id, completed: true }));
    }
  }, [progressBarOptions.progressValue]);

  useEffect(() => {
    setVisibleDeleteNot(false);
    store.removeNotification('delete-notification');
    if (goal) {
      const max: number = parseInt(goal.endResult);
      const value = Math.floor(
        (getProgressValueByTypeAndUnit(goal.type, goal.units) * 100) / max,
      );
      const progressValue: number = value <= 100 ? value : 100;
      setProgressBarOptions({
        ...progressBarOptions,
        progressValue,
      });
    }
  }, [goal]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS && update) {
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${name}» успешно обновлена!`,
        message: 'Не забывайте регулярно отмечать свой прогресс в достижении цели',
        type: NotificationType.INFO,
        dismiss: {
          duration: 5000,
          pauseOnHover: true,
          onScreen: true,
        },
      });
      dispatch(setGoalResponse(undefined));
      if (refResetForm.current) {
        refResetForm.current();
      }
      setUpdate(false);
    }
  }, [loadingStatus, update]);

  useEffect(() => {
    if (deleted && loadingStatus === LoadingStatus.LOADED) {
      dispatch(fetchGoalsData());
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${name}» успешно удалена!`,
        message: 'Чтобы закрыть это уведомление, нажмите на него',
        type: NotificationType.SUCCESS,
        dismiss: {
          duration: 5000,
          pauseOnHover: true,
          onScreen: true,
        },
      });
      setDeleted(false);
      history.push('/goals');
    }
  }, [goal, deleted, loadingStatus]);

  useEffect(() => {
    if (
      goal?.completed &&
      loadingStatus === LoadingStatus.LOADED &&
      progressBarOptions.progressValue >= 100
    ) {
      dispatch(fetchGoalsData());
      eventBus.emit(EventTypes.notification, {
        title: `Цель ${name} успешно завершена!`,
        message: 'Поздравляем с завершением цели!',
        type: NotificationType.SUCCESS,
        dismiss: {
          duration: 10000,
          pauseOnHover: true,
          onScreen: true,
        },
      });
      setProgressBarOptions({ ...progressBarOptions, progressValue: 0 });
      history.push('/goals');
    }
  }, [loadingStatus]);

  async function onSubmit(values: GoalValue, options: FormikHelpers<GoalValue>) {
    refResetForm.current = options.resetForm;
    setName(goal?.name || '');
    setUpdate(true);
    dispatch(
      updateGoalData({
        id: goal?.id,
        values: [values],
      }),
    );
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
    eventBus.emit(EventTypes.notification, {
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
      type: NotificationType.DANGER,
      dismiss: undefined,
      id: 'delete-notification',
      onRemoval: () => {
        setVisibleDeleteNot(false);
      },
    });
  }

  return (
    <>
      <div className={s.goalPanel}>
        <div className={s.top}>
          <ProgressBar progressBarOptions={progressBarOptions} />
          <div className={s.goalActions}>
            <Link to={`/goals/edit/${goal?.id}`} className={s.action}>
              <GlobalSvgSelector id="edit" />
              <p>редактировать цель</p>
            </Link>

            <div className={s.action} onClick={deleteGoal}>
              <GlobalSvgSelector id="delete-card" />
              <p>Удалить цель</p>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <div className={s.title}>
            <p>Сообщите нам о вашем прогрессе</p>
          </div>

          <Formik
            initialValues={{
              value: '',
              createdAt: new Date(),
            }}
            validateOnBlur
            onSubmit={(values: GoalValue, options: FormikHelpers<GoalValue>) =>
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
                    placeholder={`Результат (${goal?.units?.[0]?.label})`}
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
      </div>
    </>
  );
};
