import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { Recommended } from '../components/Recommended/Recommended';
import { TestsAndAnalyze } from '../components/TestsAndAnalyze/TestsAndAnalyze';
import { useHistory, useParams } from 'react-router';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';

import s from './Profile.module.scss';
import { SortedRecommendations } from '../../../store/ducks/recommendations/selectors';
import {
  Analyze,
  AnalyzeAnswer,
} from '../../../store/ducks/analyze/contracts/state';
import { Progress as IProgress } from '../../../store/ducks/progress/contracts/state';
import { LoadingStatus } from '../../../store/types';

interface Props {
  user: User;
  goalsLength: number;
  recommendations: SortedRecommendations;
  analyzeTypes: Analyze[];
  analyzes: AnalyzeAnswer[];
  questionnaireAnswers: Answer[];
  progress: IProgress[];
  progressLoadingStatus: LoadingStatus;
}

export interface Param {
  active: string;
}

export const Profile = ({
  user,
  goalsLength,
  recommendations,
  questionnaireAnswers,
  analyzes,
  analyzeTypes,
  progress,
  progressLoadingStatus,
}: Props) => {
  const tabs: Tab[] = [
    {
      key: 'recommended',
      value: 'Рекомендации',
    },
    {
      key: 'test-analyzes',
      value: 'Тестирование и Анализы',
    },
    {
      key: 'progress',
      value: 'Прогресс',
    },
  ];

  const { active } = useParams<Param>();

  const history = useHistory();

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const tariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  };

  function onTabClick(tab: Tab) {
    history.push(`/${`users/${user?.id}`}/tabs/${tab.key}`);
  }

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/profile/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
      );
    }
  }, [active]);

  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          <Card user={user} />
          <div className={s.userInfo}>
            <Goals goalsLength={goalsLength} />
            <Tariff tariff={tariffData} />
          </div>
        </div>
        <div className={s.content}>
          <div className={s.tabs__container}>
            <div className={s.horizontalScroll}>
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onActiveTabChanged={setActiveTab}
                spaceBetween={50}
                onTabClick={onTabClick}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && (
            <Recommended recommendations={recommendations} />
          )}
          {activeTab === tabs[1].key && (
            <TestsAndAnalyze
              questionnaireAnswers={questionnaireAnswers}
              analyzes={analyzes}
              analyzeTypes={analyzeTypes}
            />
          )}
          {activeTab === tabs[2].key && (
            <Progress
              progress={progress}
              loadingStatus={progressLoadingStatus}
            />
          )}
        </div>
      </div>
    </>
  );
};
