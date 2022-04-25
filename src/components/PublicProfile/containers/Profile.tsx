import React, { useState } from 'react';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { Recommended } from '../components/Recommended/Recommended';
import { TestsAndAnalyze } from '../components/TestsAndAnalyze/TestsAndAnalyze';
import { useParams } from 'react-router';
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
  onAddComment: (comment: string, analyzeId: number) => void;
  isLoadingComment: boolean;
  onDeleteComment: (id: number) => void;
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
  onAddComment,
  onDeleteComment,
  isLoadingComment,
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

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const tariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  }; // TODO: добавить нормальные данные

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
              />
            </div>
          </div>
          {activeTab === tabs[0].key && (
            <Recommended recommendations={recommendations} />
          )}
          {activeTab === tabs[1].key && (
            <TestsAndAnalyze
              onDeleteComment={onDeleteComment}
              isLoadingComment={isLoadingComment}
              onAddComment={onAddComment}
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
