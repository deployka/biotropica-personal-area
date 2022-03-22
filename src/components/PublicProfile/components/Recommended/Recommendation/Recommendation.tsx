import React, { useState } from 'react';

import { Header } from './Header';
import { Content } from './Content';
import { Info } from './Info';

import { Recommendation as IRecommendation } from '../../../../../store/ducks/recommendation/contracts/state';

import s from './Recommendation.module.scss';
import AnimateHeight from 'react-animate-height';

interface Props {
  id: string;
  activeProfiles: Record<string, IRecommendation[]>;
}

export const Recommendation = ({ id, activeProfiles }: Props) => {
  const [height, setHeight] = useState<number | string>('auto');

  return (
    <div className={s.recommendation}>
      <Header profile={activeProfiles[id][0].specialistProfile} />
      <AnimateHeight duration={300} height={height ? 0 : 'auto'}>
        <div className={s.postsWrapper}>
          {activeProfiles[id].map((recommendation: IRecommendation) => (
            <Content
              key={`${recommendation.id}`}
              recommendation={recommendation}
            />
          ))}
        </div>
      </AnimateHeight>
      <Info height={height} setHeight={setHeight} />
    </div>
  );
};
