import React from 'react';
import { useParams } from 'react-router';
import s from './Specialist.module.scss';
import { SpecialistProfile } from '../../shared/Modules/SpecialistProfile';

export function Specialist() {
  const { id } = useParams<{id: string}>();
  return <SpecialistProfile id={id} className={s.specialist}/>;
}
