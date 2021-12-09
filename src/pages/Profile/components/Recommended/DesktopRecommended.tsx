import React, { Dispatch, SetStateAction } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { RecommendedCard } from './RecommendedCard/RecommendedCard';

import {
  Recommendation as IRecommendation,
  RecommendationType,
} from '../../../../store/ducks/recommendation/contracts/state';

import 'react-perfect-scrollbar/dist/css/styles.css';

import s from './Recommended.module.scss';
import { Recommendation } from './Recommendation/Recommendation';

interface Props {
  recTypes: RecommendationType[];
  activeType: RecommendationType | null;
  setActiveType: Dispatch<SetStateAction<RecommendationType | null>>;
  optionsByType: any;
  getAmountByType: (type: RecommendationType) => number;
  activeProfiles: Record<string, IRecommendation[]>;
}

export const DesktopRecommended = ({
  recTypes,
  activeType,
  setActiveType,
  optionsByType,
  getAmountByType,
  activeProfiles,
}: Props) => {
  return (
    <>
      <div className={s.cards}>
        {recTypes.map(type => (
          <RecommendedCard
            setActiveType={setActiveType}
            activeType={activeType}
            key={type}
            type={type}
            options={optionsByType[type]}
            amount={getAmountByType(type)}
          />
        ))}
      </div>

      <PerfectScrollbar>
        <div className={s.content}>
          {Object.keys(activeProfiles).map(id => (
            <Recommendation
              key={`${id}`}
              id={id}
              activeProfiles={activeProfiles}
            />
          ))}
        </div>
      </PerfectScrollbar>
    </>
  );
};
