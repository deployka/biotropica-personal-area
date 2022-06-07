import React, { useState } from 'react';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { TestsAndAnalyze } from '../components/TestsAndAnalyze/TestsAndAnalyze';
import { useHistory, useParams } from 'react-router';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';

import ChatIcon from './../../../assets/icons/ChatLight.svg';

import s from './Profile.module.scss';

import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../GlobalNotifications/GlobalNotifications';
import classNames from 'classnames';
import { Analyze } from '../../../@types/entities/Analyze';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { Answer } from '../../../@types/entities/Answer';
import { Progress as IProgress } from '../../../@types/entities/Progress';
import { useCreateDialogMutation } from '../../../api/chat';
import { Client } from '../../../@types/entities/Client';

interface Props {
  user: Client;
  goalsLength: number;
  analyzeTypes: Analyze[];
  analyzes: AnalyzeAnswer[];
  questionnaireAnswers: Answer[];
  progress: IProgress[];
  progressIsLoading: boolean;
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
  questionnaireAnswers,
  analyzes,
  analyzeTypes,
  progress,
  onAddComment,
  onDeleteComment,
  isLoadingComment,
  progressIsLoading,
}: Props) => {
  const tabs: Tab[] = [
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
  const [createDialog] = useCreateDialogMutation();

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const tariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  }; // TODO: добавить нормальные данные

  function moveToTasks() {
    history.push(`/users/${user.id}/tasks`);
  }

  async function createChat() {
    if (!user) return;
    try {
      const dialog = await createDialog({ userId: user.id }).unwrap();
      eventBus.emit(EventTypes.chatOpen, dialog.id);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка при создании чата',
        type: NotificationType.DANGER,
      });
    }
  }

  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          <Card user={user} />
          <div className={s.userInfo}>
            <Goals goalsLength={goalsLength} />
            <Tariff tariff={tariffData} />
          </div>
          <div className={s.userActions}>
            <button className={s.button} onClick={moveToTasks}>
              Задачи и рекомендации
            </button>
            <button
              className={classNames(s.button, s.small)}
              onClick={createChat}
            >
              <img className={s.icon} src={ChatIcon} />
              <span className={s.text}>Начать чат</span>
            </button>
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
            <TestsAndAnalyze
              onDeleteComment={onDeleteComment}
              isLoadingComment={isLoadingComment}
              onAddComment={onAddComment}
              questionnaireAnswers={questionnaireAnswers}
              analyzes={analyzes}
              analyzeTypes={analyzeTypes}
            />
          )}
          {activeTab === tabs[1].key && (
            <Progress progress={progress} isLoading={progressIsLoading} />
          )}
        </div>
      </div>
    </>
  );
};
