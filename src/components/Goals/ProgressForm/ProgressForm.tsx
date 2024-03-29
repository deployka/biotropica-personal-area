import React, { useCallback } from 'react';
import { Formik, FormikHelpers } from 'formik';
import MaskedInput from 'react-maskedinput';
import { Link } from 'react-router-dom';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { Button } from '../../../shared/Form/Button/Button';
import { DatePickerCustom } from '../../../shared/Form/DatePicker/DatePickerCustom';
import { Input } from '../../../shared/Form/Input/Input';
import { Loader } from '../../../shared/Form/Loader/Loader';
import {
  GoalsProgressBar,
  progressBarOptions,
} from '../ProgressBar/ProgressBar';
import { registerLocale } from 'react-datepicker';

import ru from 'date-fns/locale/ru';
import { validationSchema } from './validationSchema';
import s from './ProgressForm.module.scss';
import { Goal } from '../../../@types/entities/Goal';
import { MAX_PROGRESS } from '../../../constants/goals';
import { getProgressValueByTypeAndUnit } from '../../../utils/goalsHelper';
import { UpdateGoalValuesDto } from '../../../@types/dto/goals/update-values.dto';

registerLocale('ru', ru);

interface Props {
  goal: Goal;
  onDeleteGoal: () => void;
  onSubmit: (
    values: UpdateGoalValuesDto,
    options: FormikHelpers<UpdateGoalValuesDto>,
  ) => void;
  progressBarOptions: progressBarOptions;
  isLoading: boolean;
}

export const ProgressForm = ({
  goal,
  onDeleteGoal,
  progressBarOptions,
  onSubmit,
  isLoading,
}: Props) => {
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || isLoading;
  }

  const getProgressValue = useCallback(() => {
    const value = getProgressValueByTypeAndUnit(goal.type, goal.units, goal);
    return value <= MAX_PROGRESS ? value : MAX_PROGRESS;
  }, [goal.values, goal.endResult]);

  return (
    <>
      <div className={s.goalPanel}>
        <div className={s.top}>
          <GoalsProgressBar
            progressValue={getProgressValue()}
            progressBarOptions={progressBarOptions}
          />
          <div className={s.goalActions}>
            <Link to={`/goals/edit/${goal.id}`} className={s.action}>
              <GlobalSvgSelector id="edit" />
              <p>редактировать цель</p>
            </Link>

            <div className={s.action} onClick={onDeleteGoal}>
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
              id: goal.id,
              value: '',
              createdAt: new Date(),
            }}
            validateOnBlur
            onSubmit={(
              values: UpdateGoalValuesDto,
              options: FormikHelpers<UpdateGoalValuesDto>,
            ) => {
              onSubmit(values, options);
            }}
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
                    placeholder={`Результат (${goal.units[0].label})`}
                    name="value"
                    value={values.value}
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
                    selected={values.createdAt}
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
                        <MaskedInput
                          mask="11.11.1111"
                          placeholder="dd.mm.yyyy"
                        />
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
                      content: isLoading ? <Loader /> : 'Добавить',
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
