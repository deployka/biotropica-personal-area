import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { RecommendedCard } from './RecommendedCard/RecommendedCard';
import { Recommendation } from './Recommendation/Recommendation';

import {
  Recommendation as IRecommendation,
  RecommendationType,
} from '../../../../store/ducks/recommendation/contracts/state';

import 'react-perfect-scrollbar/dist/css/styles.css';

import s from './Recommended.module.scss';
import { SortedRecommendations } from '../../../../store/ducks/recommendations/selectors';

interface Props {
  recTypes: RecommendationType[];
  activeType: RecommendationType | null;
  setActiveType: Dispatch<SetStateAction<RecommendationType | null>>;
  optionsByType: any;
  getAmountByType: (type: RecommendationType) => number;
  getProfilesByType: (
    type: RecommendationType
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
      {recTypes.map((type) => (
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
            <div className={s.content}>
              {activeType === type &&
                Object.keys(getProfilesByType(type)).map((id) => (
                  <Recommendation
                    key={`${id}`}
                    id={id}
                    activeProfiles={getProfilesByType(type)}
                  />
                ))}
            </div>
          </PerfectScrollbar>
        </div>
      ))}
    </div>
  );
};
