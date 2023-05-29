import React from 'react';
import s from './SpecialistTable.module.scss';
import { SpecialistItem } from '../SpecialistItem/SpecialistItem';
import { Client } from '../../../../@types/entities/Client';
import { BaseUser } from '../../../../@types/entities/BaseUser';

export type SpecialistTableProps = {
  users: BaseUser[];
};

export function SpecialistTable(props: SpecialistTableProps) {
  return (
    <>
      <div className={s.usersList}>
        {props.users.map((user, i) => (
          <SpecialistItem key={i} user={user} />
        ))}
      </div>
    </>
  );
}
