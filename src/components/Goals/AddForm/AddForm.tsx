import { Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../../../shared/Form/Button/Button';
import { Input } from '../../../shared/Form/Input/Input';
import { Loader } from '../../../shared/Form/Loader/Loader';

import { validationSchema } from './validationSchema';
import { Textarea } from '../../../shared/Form/Textarea/Textarea';
import {
  ISelect,
  SelectCustom,
} from '../../../shared/Form/Select/SelectCustom';

import s from './AddForm.module.scss';
import { GoalUnits } from '../../../@types/entities/Goal';
import { CreateGoalFormDto } from '../../../@types/dto/goals/create-form.dto';

export interface FormGoalData
  extends Omit<CreateGoalFormDto, 'endResult' | 'startResult'> {
  endResult: number;
  startResult: number;
}

interface Props {
  goalTemplate: FormGoalData;
  setNext: Dispatch<SetStateAction<boolean>>;
  onSubmit: (
    values: FormGoalData,
    options: FormikHelpers<FormGoalData>,
  ) => void;
  isLoading: boolean;
  options: ISelect<string>[] | undefined;
}

export const GoalAddForm = ({
  goalTemplate,
  setNext,
  isLoading,
  onSubmit,
  options,
}: Props) => {
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || isLoading;
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
            ...goalTemplate,
          }}
          validateOnBlur
          onSubmit={(values: FormGoalData, options) =>
            onSubmit(values, options)
          }
          validationSchema={validationSchema(goalTemplate.type)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            setFieldValue,
            dirty,
          }) => (
            <div className={s.form}>
              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Название задачи"
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
                <SelectCustom
                  onChange={(e: ISelect<GoalUnits>) => {
                    setFieldValue('units', [e]);
                  }}
                  placeholder="Единицы измерения"
                  onBlur={handleBlur}
                  name="units"
                  value={(values.units[0].label && values.units) || undefined}
                  options={options}
                  settings={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Желаемый результат"
                  name="endResult"
                  value={values.endResult}
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
                  label="Текущий результат"
                  name="startResult"
                  value={values.startResult}
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
                    content: isLoading ? <Loader /> : 'Сохранить',
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
