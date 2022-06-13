import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { useModal } from '../../../hooks/useModal';
import { ModalName } from '../../../providers/ModalProvider';
import { useHistory, useParams } from 'react-router';
import { Param } from './Edit';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { Button } from '../components/Button/Button';
import { useGetGoalsQuery } from '../../../api/goals';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { QuestionnaireResults } from '../components/QuestionnaireResults/QuestionnaireResults';
import { useGetQuestionnaireAnswersQuery } from '../../../api/user';

import s from './Profile.module.scss';
import { Analyzes } from '../../../components/Analyzes/Analyzes';
import { CreateAnalyzeAnswerDto } from '../../../@types/dto/analyzes/create.dto';
import {
  useCreateAnalyzeAnswerMutation,
  useGetAnalyzeAnswersQuery,
} from '../../../api/analyze-answers';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { useGetAnalyzesQuery } from '../../../api/analyzes';

interface Props {
  user: BaseUser;
}

const tabs: Tab[] = [
  {
    key: 'analyzes',
    value: 'Анализы',
  },
  {
    key: 'questionnaire',
    value: 'Тестирование',
  },
  {
    key: 'progress',
    value: 'Прогресс',
  },
];

const Profile = ({ user }: Props) => {
  const { openModal, closeModal } = useModal();
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);
  const { data: goals = [] } = useGetGoalsQuery();

  const { active } = useParams<Param>();

  const history = useHistory();

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const [createAnalyzeAnswer, { isLoading: isCreateAnalyzeAnswerLoading }] =
    useCreateAnalyzeAnswerMutation();
  const { data: questionnaireAnswers = [] } = useGetQuestionnaireAnswersQuery(
    user.id,
  );
  const { data: analyzeTypes = [], isLoading: isAnalyzesTypesLoading = false } =
    useGetAnalyzesQuery();
  const { data: analyzes = [], isLoading: isAnalyzesLoading = false } =
    useGetAnalyzeAnswersQuery({
      userId: user.id,
    });

  // FIXME: добавить отображение тарифа
  const tariffData = {
    name: 'стандарт',
    expires: '9 июля 2021',
  };

  function onTabClick(tab: Tab) {
    history.push(`/profile/tabs/${tab.key}`);
  }

  function openProgressModal() {
    openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO, { user });
  }

  const handleSubmitAnalyzes = async (values: CreateAnalyzeAnswerDto) => {
    try {
      await createAnalyzeAnswer(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Анализ успешно загружен',
        type: NotificationType.SUCCESS,
        autoClose: 10000,
      });
      setIsAnalyzeModalOpen(false);
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        title: 'Ошибка!',
        message: 'Произошла непредвиденная ошибка!',
        type: NotificationType.DANGER,
        autoClose: 10000,
      });
    }
  };

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/profile/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
      );
    }
  }, [active]);

  function moveToTasks() {
    history.push('/');
  }

  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          <Card user={user} />
          <div className={s.userInfo}>
            <Goals goalsLength={goals.length} />
            <Tariff tariff={tariffData} />
          </div>
          <div className={s.moveToTasks}>
            <Button onClick={moveToTasks}>Задачи и рекомендации</Button>
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
            <Analyzes
              isAnalyzesLoading={isAnalyzesTypesLoading || isAnalyzesLoading}
              onAddAnalyze={handleSubmitAnalyzes}
              isAddAnalyzeLoading={isCreateAnalyzeAnswerLoading}
              isModalOpen={isAnalyzeModalOpen}
              setIsModalOpen={setIsAnalyzeModalOpen}
              analyzes={analyzes}
              analyzeTypes={analyzeTypes}
            />
          )}
          {activeTab === tabs[1].key && (
            <QuestionnaireResults answers={questionnaireAnswers} />
          )}
          {activeTab === tabs[2].key && (
            <button onClick={openProgressModal} className={s.btn__add__photo}>
              добавить фото
            </button>
          )}
          {activeTab === tabs[2].key && <Progress user={user} />}
        </div>
      </div>
    </>
  );
};

export default Profile;
