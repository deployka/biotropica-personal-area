import { Formik } from 'formik';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../../../config/notification/notificationForm';
import { Button } from '../../../../shared/Form/Button/Button';
import { Input } from '../../../../shared/Form/Input/Input';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import {
  CreateGoalData,
  Goal,
} from '../../../../store/ducks/goal/contracts/state';
import {
  createGoalData,
  setGoalResponse,
} from '../../../../store/ducks/goal/actionCreators';
import {
  selectGoalLoadingStatus,
  selectGoalResponse,
} from '../../../../store/ducks/goal/selectors';
import { LoadingStatus } from '../../../../store/types';

import s from './AddGoalForm.module.scss';
import { validationSchema } from './validationSchema';
import { Textarea } from '../../../../shared/Form/Textarea/Textarea';
import { useHistory } from 'react-router-dom';
import { fetchGoalsData } from '../../../../store/ducks/goals/actionCreators';
import { selectGoalsData } from '../../../../store/ducks/goals/selectors';

interface Props {
  goal: CreateGoalData;
  setNext: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
}

export const AddGoalForm = ({ goal, setNext, edit }: Props) => {
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
      history.push('/goals');
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
        title: `Цель «${name}» успешно создана!`,
        message:
          'Не забывайте регулярно отмечать свой прогресс в достижении цели',
        type: 'success',
        dismiss: false,
      });
      dispatch(setGoalResponse(undefined));
      dispatch(fetchGoalsData());
      refResetForm.current();
    }
  }, [loadingStatus]);

  async function onSubmit(values: CreateGoalData, options: any) {
    refResetForm.current = options.resetForm;
    setName(values.name);

    try {
      dispatch(createGoalData(values));
    } catch (error) {}
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  return (
    <div className={s.add__goals__form}>
      <div className={s.add__goals__form__wrapper}>
        <h2 className={s.form__title}>
          Введите заголовок, описание <br /> и параметры цели, а также ваш
          текущий результат
        </h2>

        <Formik
          initialValues={{
            ...goal,
          }}
          validateOnBlur
          onSubmit={(values: CreateGoalData, options) =>
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
          }) => (
            <div className={s.form}>
              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Название задачи"
                  name="name"
                  value={values.name}
                  type="text"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Textarea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Описание"
                  name="description"
                  value={values.description}
                  type="text"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Желаемый результат"
                  name="end_result"
                  value={values.end_result}
                  type="text"
                  options={{
                    touched,
                    errors,
                  }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Текущий результат"
                  name="start_result"
                  value={values.start_result}
                  type="text"
                  options={{
                    touched,
                    errors,
                  }}
                />
              </div>

              <div className={s.buttons}>
                <Button
                  options={{
                    width: '100px',
                    height: '30px',
                    classes: { discard: true },
                    content: 'Назад',
                  }}
                  onClick={() => setNext(false)}
                />

                <Button
                  disabled={isDisabled(isValid, dirty)}
                  type="submit"
                  onClick={() => handleSubmit()}
                  options={{
                    content: loader ? <Loader /> : 'Сохранить',
                    setDisabledStyle: isDisabled(isValid, dirty),
                    width: '100px',
                    height: '30px',
                  }}
                />
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};