import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import Input, { InputTypes } from '../../Input/Input';
import Button from '../../Button/Button';
import { Tariff } from '../../../@types/entities/Tariff';
import { CreateTariffDto } from '../../../@types/dto/tariffs/create.dto';
import validationSchema from './validationSchema';

import s from './AddForm.module.scss';

export type FormData = Omit<CreateTariffDto, 'includedFields'>;

type Props = {
  defaultValues?: Tariff;
  onClose: () => void;
  onSubmit: (data: CreateTariffDto) => void;
};

export function TariffAddForm({ defaultValues, onClose, onSubmit }: Props) {
  const [tariffFeatures, setTariffFeatures] = useState<string[]>(
    defaultValues?.includedFields || [],
  );

  const handleSubmit = (data: FormData) => {
    onSubmit({ ...data, includedFields: tariffFeatures });
  };

  const changeIncludedField = (value: string, index: number) => {
    const updatedFields = tariffFeatures.slice();
    updatedFields.splice(index, 1, value);

    setTariffFeatures(updatedFields);
  };

  const deleteIncludedField = (fieldIndex: number) => {
    const updatedFields = tariffFeatures.slice();
    updatedFields.splice(fieldIndex, 1);

    setTariffFeatures(updatedFields);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        cost: defaultValues?.cost || 0,
        description: defaultValues?.description || '',
        title: defaultValues?.title || '',
        zakazSystemId: defaultValues?.zakazSystemId || '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p>Создание тарифа</p>
          <Input
            name="cost"
            type={InputTypes.NUMBER}
            label="Цена"
            placeholder="Цена тарифа"
            suffix="₽"
            value={values.cost}
            onChange={handleChange}
            classes={s.input}
          />
          <Input
            name="zakazSystemId"
            type={InputTypes.TEXT}
            label="Id тарифа (zakazSystemId)"
            placeholder="zakazSystemId"
            value={values.zakazSystemId || ''}
            onChange={handleChange}
            classes={s.input}
          />
          <Input
            name="title"
            type={InputTypes.TEXT}
            label="Название"
            placeholder="Введите название тарифа"
            value={values.title}
            // isError={name.trim() === ''}
            onChange={handleChange}
            classes={s.input}
          />
          {tariffFeatures.map((feature, index) => (
            <Input
              key={index}
              name={`includedField/${index}`}
              type={InputTypes.TEXT}
              label={index === 0 ? 'что входит в план' : undefined}
              placeholder="Введите опцию"
              value={feature.toString()}
              isError={feature.trim() === ''}
              classes={s.input}
              onChange={e => changeIncludedField(e.currentTarget.value, index)}
              withCancel
              onCancel={() => deleteIncludedField(index)}
            />
          ))}
          <Button
            className={s.addFieldBtn}
            isDisabled={tariffFeatures.includes('')}
            isFunctional
            onClick={() => setTariffFeatures([...tariffFeatures, ''])}
          >
            Добавить поле
          </Button>
          <div className={s.closeAndSave}>
            <Button isFunctional onClick={onClose} className={s.closeBtn}>
              Отмена
            </Button>
            <Button isPrimary type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
