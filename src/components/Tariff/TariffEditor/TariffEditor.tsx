import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import Input, { InputTypes } from '../../Input/Input';
import Button from '../../Button/Button';
import { Tariff, NewTariff } from '../../../types/entities/Tariff';

import s from './TariffEditor.module.scss';

export type TariffEditorProps = {
	id?: number,
	title?: string,
	cost?: number,
	includedFields?: Array<string>,
	isNew?: boolean;
	onClose(): void;
	onRemove?(): void;
	onSave(tariff: Tariff | NewTariff): void;
};

export function TariffEditor(props: TariffEditorProps) {
  const {
    id,
    title = '',
    cost = 0,
    includedFields = [''],
    isNew,
    onClose,
    onSave,
    onRemove,
  } = props;

  const [price, setPrice] = useState(cost);
  const [name, setName] = useState(title);
  const [features, setFeatures] = useState(includedFields);

  function changeIncludedField(value: string, i: number) {
    const updatedFields = features.slice();
    updatedFields.splice(i, 1, value);

    setFeatures(updatedFields);
  }

  function deleteIncludedField(i: number) {
    const updatedFields = features.slice();
    updatedFields.splice(i, 1);

    setFeatures(updatedFields);
  }

  function save() {
    const filteredFields = features.filter(it => it.trim() !== '');

    const updatedTariff = {
      title: name,
      cost: price,
      description: '',
      includedFields: filteredFields,
      access: [],
    } as Tariff | NewTariff;
    id ? console.log({ ...updatedTariff, id: id }) : console.log('polnaya pizda');
    id ? onSave({ ...updatedTariff, id: id }) : onSave(updatedTariff);
  }

  return (
		<Formik
			initialValues={{}}
			onSubmit={save}
		>
			<Form className={s.form}>
				<Input
					name='cost'
					type={InputTypes.NUMBER}
					label='Цена'
					placeholder='Введите цену тарифа'
					suffix='₽'
					value={price || ''}
					onChange={e => setPrice(+e.currentTarget.value)}
					classes={s.input}
				/>

				<Input
					name='title'
					type={InputTypes.TEXT}
					label='Название'
					placeholder='Введите название тарифа'
					value={name}
					isError={name.trim() === ''}
					onChange={e => setName(e.currentTarget.value)}
					classes={s.input}
				/>

				{
					features.map((feature, i) => (
						<Input
							key={i}
							name={`includedField/${i}`}
							type={InputTypes.TEXT}
							label={i === 0 ? 'что входит в план' : undefined}
							placeholder='Введите опцию'
							value={feature.toString()}
							isError={feature.trim() === ''}
							classes={s.input}
							onChange={e => changeIncludedField(e.currentTarget.value, i)}
							withCancel
							onCancel={() => deleteIncludedField(i)}
						/>
					))
				}

				<Button
					className={s.addFieldBtn}
					isDisabled={features.includes('')}
					isFunctional
					onClick={() => setFeatures([...features, ''])}
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8.4 1C8.731 1 9 1.269 9 1.6V7H14.4C14.731 7 15 7.269 15 7.6V8.4C15 8.731 14.731 9 14.4 9H9V14.4C9 14.731 8.731 15 8.4 15H7.6C7.269 15 7 14.731 7 14.4V9H1.6C1.269 9 1 8.731 1 8.4V7.6C1 7.269 1.269 7 1.6 7H7V1.6C7 1.269 7.269 1 7.6 1H8.4V1Z"
						/>
					</svg>

					добавить поле
				</Button>

				<div className={s.closeAndSave}>
					<Button isFunctional onClick={onClose}>Отмена</Button>
					<Button
						isPrimary
						type='submit'
						isDisabled={name.trim() === '' || price === 0}
					>
						Сохранить
					</Button>
				</div>

				{
					!isNew && (
						<a
							href='#'
							className={s.deleteBtn}
							onClick={onRemove}
						>
							Удалить тариф
						</a>
					)
				}
			</Form>
		</Formik>
  );
}
