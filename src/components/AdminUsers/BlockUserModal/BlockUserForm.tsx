import React, { useState } from 'react';
import { Formik } from 'formik';

import validationSchema from './validationSchema';
import s from './BlockUserForm.module.scss';
import { Textarea } from '../../../shared/Form/Textarea/Textarea';
import Button from '../../Button/Button';

type Props = {
  onSubmit: (banReason: string) => void;
  onCancel: () => void;
};

export const BlockUserForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={{
          banReason: '',
        }}
        validateOnBlur
        onSubmit={(values: { banReason: string }) => onSubmit(values.banReason)}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className={s.form}>
            <div className={s.input__wrapper}>
              <Textarea
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Причина блокировки"
                name="banReason"
                value={values.banReason}
                options={{ errors, touched }}
              />
            </div>
            <div className={s.buttons}>
              <Button isPrimary onClick={() => handleSubmit()}>
                Подтвердить
              </Button>
              <Button onClick={onCancel}>Отменить</Button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
