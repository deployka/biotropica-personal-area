import React, { Dispatch, SetStateAction } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { RecommendedCard } from './RecommendedCard/RecommendedCard';
import { Recommendation } from './Recommendation/Recommendation';

import {
  Recommendation as IRecommendation,
  RecommendationType,
} from '../../../../store/ducks/recommendation/contracts/state';

import 'react-perfect-scrollbar/dist/css/styles.css';

import s from './Recommended.module.scss';
import AnimateHeight from 'react-animate-height';

interface Props {
  recTypes: RecommendationType[];
  activeType: RecommendationType | null;
  setActiveType: Dispatch<SetStateAction<RecommendationType | null>>;
  optionsByType: {
    [key in RecommendationType]: { name: string; color: string };
  };
  getAmountByType: (type: RecommendationType) => number;
  getProfilesByType: (
    type: RecommendationType,
  ) => Record<string, IRecommendation[]>;
}

export const MobileRecommended = ({
  recTypes,
  activeType,
  setActiveType,
  optionsByType,
  getAmountByType,
  getProfilesByType,
}: Props) => {
  return (
    <div className={s.mobile}>
      {recTypes.map(type => (
        <div key={type}>
          <RecommendedCard
            setActiveType={setActiveType}
            activeType={activeType}
            key={type}
            type={type}
            options={optionsByType[type]}
            amount={getAmountByType(type)}
          />
          <PerfectScrollbar>
            <AnimateHeight height={activeType === type ? 'auto' : 0}>
              <div className={s.content}>
                {Object.keys(getProfilesByType(type)).map(id => (
                  <Recommendation
                    key={`${id}`}
                    id={id}
                    activeProfiles={getProfilesByType(type)}
                  />
                ))}
              </div>
            </AnimateHeight>
          </PerfectScrollbar>
        </div>
      ))}
    </div>
  );
};
