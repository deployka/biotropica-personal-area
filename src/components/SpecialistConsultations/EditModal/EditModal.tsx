import { Formik } from 'formik';
import React from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';
import Modal from '../../../shared/Global/Modal/Modal';
import Button from '../../Button/Button';
import DatePickerCustom from '../../DatePicker/DatePickerCustom';
import Divider from '../../Divider/Divider';
import { TimePickerCustom } from '../../TimePickerCustom/TimePickerCustom';
import validationSchema from './validationSchema';

import s from './EditModal.module.scss';

type FormData = {
  date: string;
  time: string;
};

type Props = {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (date: Date) => void;
  defaultValues: FormData;
};

const MIN_DATE = new Date();

export const SpecialistConsultationsEditModal = ({
  isOpened,
  defaultValues,
  onSubmit,
  onClose,
}: Props) => {
  const handleSubmitForm = (data: FormData) => {
    const date = new Date(data.date);
    const time = data.time;
    date.setHours(+time.slice(0, 2));
    date.setMinutes(+time.slice(3));
    onSubmit(date);
  };

  return (
    <Modal className={s.modal} isOpened={isOpened} close={onClose}>
      <div className={s.container}>
        <h2 className={s.header}>Изменить дату и время</h2>
        <Formik
          initialValues={{
            date: defaultValues.date,
            time: defaultValues.time,
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleSubmitForm(values)}
        >
          {({
            values,
            touched,
            errors,
            handleSubmit,
            handleBlur,
            setFieldValue,
          }) => (
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.row}>
                <div className={s.input}>
                  <DatePickerCustom
                    name="date"
                    label="Дата"
                    selected={
                      values.date ? new Date(values.date as string) : null
                    }
                    minDate={MIN_DATE}
                    onBlur={handleBlur}
                    onChange={(date: Date) => setFieldValue('date', date)}
                    onSelect={(date: Date) => setFieldValue('date', date)}
                  />
                </div>
                <div className={s.input}>
                  <TimePickerCustom
                    name="time"
                    label="Время"
                    value={values.time}
                    touched={!!touched.time}
                    error={errors.time as string}
                    onChange={(value: TimePickerValue) => {
                      setFieldValue('time', value as string);
                    }}
                  />
                </div>
              </div>
              <div className={s.buttons}>
                <Button isPrimary type="submit">
                  Сохранить
                </Button>
                <Button onClick={onClose} type="submit">
                  Отмена
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
