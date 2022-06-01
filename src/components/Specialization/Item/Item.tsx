import React from 'react';

import classNames from 'classnames';
import { getWordCounterText } from '../../../helpers/wordHelper';

import s from './Item.module.scss';
import { SpecializationListProps } from './../List/List';
import { Specialization } from '../../../store/rtk/requests/specializations';

export type SpecializationItemProps = {
  type: SpecializationListProps['types'][number];
  onSelect(type: Specialization): void;
  selected: boolean;
};

const RECOMMENDATION_VARIATIONS: string[] = [
  'рекомендаций',
  'рекомендация',
  'рекомендации',
];

export const SpecializationItem = ({
  type,
  onSelect,
  selected,
}: SpecializationItemProps) => {
  const { specialization, count } = type;

  return (
    <div
      className={classNames(s.recommendationType, selected && s.selected)}
      onClick={() => {
        onSelect(specialization);
      }}
    >
      <div className={s.title}>{specialization.title}</div>
      <div className={s.count}>
        {count} {getWordCounterText(count, RECOMMENDATION_VARIATIONS)}
      </div>
      <div className={s.arrow}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2595 7.25954L16 12L11.2595 16.7405"
            stroke="#9E97BE"
            strokeWidth="1.81493"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
