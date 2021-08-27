import React from 'react';

import s from './Graph.module.scss';
import { GraphSvg } from './GraphSvg';

interface Props {}

export const GraphYValues = (props: Props) => {
  const values = [120, 100, 80, 60, 40, 20, 0];
  return (
    <div className={s.graph__y}>
      {values.map((value, i) => {
        return (
          <div key={value + i} className={s.graph__y__value}>
            {value}
          </div>
        );
      })}
    </div>
  );
};
