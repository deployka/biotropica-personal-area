import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';

import { Button } from '../../../shared/Form/Button/Button';
import { Input } from '../../../shared/Form/Input/Input';
import { Loader } from '../../../shared/Form/Loader/Loader';

import { validationSchema } from './validationSchema';
import { Textarea } from '../../../shared/Form/Textarea/Textarea';

import s from './GoalEditForm.module.scss';
import { Goal } from '../../../@types/entities/Goal';
import { UpdateGoalDto } from '../../../@types/dto/goals/update.dto';

type Props = {
  goal?: Goal;
  loader: boolean;
  isDisabled: (isValid: boolean, dirty: boolean) => boolean;
  onSubmit: (
    values: UpdateGoalDto,
    options: FormikHelpers<UpdateGoalDto>,
  ) => void;
};

const EditGoalForm = ({ goal, loader, isDisabled, onSubmit }: Props) => {
  return (
    <div className={s.add__goals__form}>
      <div className={s.add__goals__form__wrapper}>
        <h2 className={s.form__title}>
          Введите заголовок, описание <br /> и параметры цели
        </h2>
        {goal && (
          <Formik
            initialValues={{
              ...goal,
            }}
            validateOnBlur
            onSubmit={(values: UpdateGoalDto, options) =>
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
                    name="endResult"
                    value={values.endResult}
                    type="text"
                    options={{
                      touched,
                      errors,
                    }}
                  />
                </div>

                <div className={s.buttons}>
                  <Link to={`/goals/${goal.id}`}>
                    <Button
                      options={{
                        width: '100px',
                        height: '30px',
                        classes: { discard: true },
                        content: 'Назад',
                      }}
                    />
                  </Link>

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
        )}
      </div>
    </div>
  );
};

export default EditGoalForm;
