import React, { useState } from 'react';

import { Header } from './Header';
import { Content } from './Content';
import { Info } from './Info';

import { Recommendation as IRecommendation } from '../../../../../store/ducks/recommendation/contracts/state';

import s from './Recommendation.module.scss';

interface Props {
  id: string;
  activeProfiles: Record<string, IRecommendation[]>;
}

export const Recommendation = ({ id, activeProfiles }: Props) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={s.recommendation}>
      <Header profile={activeProfiles[id][0].specialist_profile} />
      <div className={s.postsWrapper} style={hidden ? { height: 0 } : {}}>
        {activeProfiles[id].map((recommendation: IRecommendation, i) => (
          <Content
            key={`${recommendation.id}_${i}`}
            recommendation={recommendation}
          />
        ))}
      </div>

      <Info hidden={hidden} setHidden={setHidden} />
    </div>
  );
};
