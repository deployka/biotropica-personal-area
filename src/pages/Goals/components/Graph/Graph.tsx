import React from 'react';

import s from './Graph.module.scss';
import { GraphDate } from './GraphDate';
import { GraphSvg } from './GraphSvg';
import { GraphYValues } from './GraphYValues';

interface Props {}

export const Graph = (props: Props) => {
  return (
    <div className={s.container}>
      <GraphYValues />
      <div className={s.graph}>
        <GraphSvg />
        <GraphDate />
      </div>
    </div>
  );
};
