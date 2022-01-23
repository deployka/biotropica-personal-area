import { Formik, FormikHelpers } from 'formik';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Button } from '../../../../shared/Form/Button/Button';
import { Input } from '../../../../shared/Form/Input/Input';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import {
  CreateGoalData,
  GoalUnits,
} from '../../../../store/ducks/goal/contracts/state';

import s from './AddGoalForm.module.scss';
import { validationSchema } from './validationSchema';
import { Textarea } from '../../../../shared/Form/Textarea/Textarea';
import { ISelect, SelectCustom } from '../../../../shared/Form/Select/SelectCustom';

interface Props {
  goalTemplate: CreateGoalData;
  setNext: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: CreateGoalData, options: FormikHelpers<CreateGoalData>) => void;
  isLoading: boolean;
  options: ISelect<string>[] | undefined;
}

export const AddGoalForm = ({
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
          Введите заголовок, описание <br /> и параметры цели, а также ваш текущий
          результат
        </h2>

        <Formik
          initialValues={{
            ...goalTemplate,
          }}
          validateOnBlur
          onSubmit={(values: CreateGoalData, options) => onSubmit(values, options)}
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
                  placeholder={'Желаемый результат'}
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
                  placeholder={'Текущий результат'}
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
