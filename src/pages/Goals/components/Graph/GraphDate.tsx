import React from 'react';

import s from './Graph.module.scss';
import { GraphSvg } from './GraphSvg';

interface Props {}

export const GraphDate = (props: Props) => {
  const values = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  return (
    <div className={s.graph__dates}>
      {values.map((value, i) => {
        return (
          <div key={value + i} className={s.graph__date}>
            {value}
          </div>
        );
      })}
    </div>
  );
};
