import React from 'react';
import { Formik } from 'formik';
import {
  CreateEventTask,
  EventTask,
  KindOfEvent,
} from '../../store/@types/Task';
import { NEW_DATE } from '../../constants/dates';
import Button from '../Button/Button';
import DatePickerCustom from '../DatePicker/DatePickerCustom';
import { HtmlEditor } from '../HtmlEditor/HtmlEditor';
import Input, { InputTypes } from '../Input/Input';
import SelectCustom from '../Select/SelectCustom';
import s from './EventTaskEditor.module.scss';
import {
  eventTaskOptions,
  selectCompletionType,
  selectRepeatType,
} from './EventTaskEditorConstants';
import validationSchema from './validationSchema';

export type EventTaskEditorProps = {
  task: EventTask | CreateEventTask;
  isLoading: boolean;
  onClose(): void;
  onSave(task: CreateEventTask): void;
  onSaveAsTemplate(task: Partial<CreateEventTask>): void;
};

export function EventTaskEditor({
  task,
  onClose,
  onSave,
  onSaveAsTemplate,
  isLoading,
}: EventTaskEditorProps) {
  function onSubmit(values: Partial<CreateEventTask>) {
    if (values.isTemplate) onSaveAsTemplate({ ...task, ...values });
    else onSave({ ...task, ...values });
  }

  const onChange = (values: EventTask) => {
    console.log(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: task.title,
        date: task.date,
        kindOfEvent: KindOfEvent.restDay,
        repeatType: 'daily',
        completionType: 'byRepetitionsNumber',
        completionValue: 1,
        description: task.description,
        // kindOfEvent: task.kindOfEvent,
        // repeatType: task.repeatType,
        // completionType: task.completionType,
        // completionValue: task.completionValue,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => {
        console.log('tasks', values);

        return (
          <form
            id="task-form"
            className={s.form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <div className="line">
              <Input
                type={InputTypes.TEXT}
                placeholder="Название"
                label="Название"
                name="title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className={s.line}>
              <div className={s.line}>
                <SelectCustom
                  name="kindOfEvent"
                  placeholder="Тип события"
                  label="Тип события"
                  value={values.kindOfEvent || ''}
                  options={eventTaskOptions}
                  touched={!!touched.kindOfEvent}
                  error={errors.kindOfEvent as string}
                  onBlur={handleBlur}
                  onChange={value => {
                    setFieldValue('kindOfEvent', value);
                  }}
                />
              </div>
              <DatePickerCustom
                name="date"
                minDate={NEW_DATE}
                selected={values.date ? new Date(values.date) : null}
                label={'Дата'}
                onBlur={handleBlur}
                onChange={(date: Date) => setFieldValue('date', date)}
                onSelect={(date: Date) => setFieldValue('date', date)}
              />
            </div>
            {/* <div className={s.line}>
              <SelectCustom
                name="repeatType"
                placeholder="Тип повторения"
                label="Тип повторения"
                value={values.repeatType || ''}
                options={selectRepeatType}
                touched={!!touched.repeatType}
                error={errors.repeatType}
                onBlur={handleBlur}
                onChange={repeatType => {
                  setFieldValue('repeatType', repeatType);
                }}
              />
            </div> */}
            {/* <div className={s.line}>
              <SelectCustom
                name="completionType"
                placeholder="Принцип завершения"
                label="Принцип завершения"
                value={values.completionType}
                options={selectCompletionType}
                onBlur={handleBlur}
                touched={!!touched.completionType}
                error={errors.completionType as string}
                onChange={option => {
                  values.completionValue = undefined;
                  setFieldValue('completionType', option);
                }}
              />
            </div>
            <div className={s.line}>
              {values.completionType ? (
                values.completionType === 'byDate' ? (
                  <DatePickerCustom
                    name="completionDate"
                    minDate={NEW_DATE}
                    selected={
                      typeof values.completionValue !== 'number' &&
                      values.completionValue
                        ? new Date(values.completionValue)
                        : null
                    }
                    label={'Дата завершения'}
                    onBlur={handleBlur}
                    onChange={(date: Date) =>
                      setFieldValue('completionValue', date)
                    }
                    onSelect={(date: Date) =>
                      setFieldValue('completionValue', date)
                    }
                  />
                ) : (
                  <Input
                    type={InputTypes.NUMBER}
                    placeholder="Количество повторений"
                    label="Количество повторений"
                    name="completionValue"
                    value={
                      values.completionValue ? +values.completionValue : ''
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )
              ) : (
                ''
              )}
            </div> */}
            <div className={s.line}>
              <HtmlEditor
                value={values.description || ''}
                config={{ formats: [] }}
                onChange={value => {
                  handleChange(value);
                  setFieldValue('description', value);
                }}
              />
            </div>
            <div className={s.buttons}>
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                type="submit"
                isPrimary={true}
              >
                Сохранить
              </Button>
              <Button onClick={onClose}>Отмена</Button>
              {/* <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                type="submit"
                onClick={() => setFieldValue('isTemplate', true)}
                isPrimary={true}
              >
                Сохранить как шаблон
              </Button> */}
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
