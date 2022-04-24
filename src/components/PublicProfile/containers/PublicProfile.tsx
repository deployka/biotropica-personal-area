import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AnalyzeService from '../../../services/AnalyzeService';
import { eventBus, EventTypes } from '../../../services/EventBus';
import UserService from '../../../services/UserService';
import {
  Analyze,
  AnalyzeAnswer,
} from '../../../store/ducks/analyze/contracts/state';
import {
  fetchAnalyzesData,
  setAnalyzesData,
} from '../../../store/ducks/analyzes/actionCreators';
import { selectAnalyzesData } from '../../../store/ducks/analyzes/selectors';
import { fetchGoalsDataById } from '../../../store/ducks/goals/actionCreators';
import { selectGoalsData } from '../../../store/ducks/goals/selectors';
import { fetchProgressData } from '../../../store/ducks/progress/actionCreators';
import {
  selectProgressData,
  selectProgressLoadingStatus,
} from '../../../store/ducks/progress/selectors';
import { fetchRecommendationsData } from '../../../store/ducks/recommendations/actionCreators';
import { selectSortedRecommendationsData } from '../../../store/ducks/recommendations/selectors';
import { fetchUserDataById } from '../../../store/ducks/user/actionCreators';
import { selectUserData } from '../../../store/ducks/user/selectors';
import { NotificationType } from '../../GlobalNotifications/GlobalNotifications';
import { Profile } from './Profile';

export const PublicProfile = () => {
  const { id } = useParams<{ id: string }>();

  const userId = +id;
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const progress = useSelector(selectProgressData) || [];
  const goalsLength = useSelector(selectGoalsData).length;
  const recommendations = useSelector(selectSortedRecommendationsData);
  const progressLoadingStatus = useSelector(selectProgressLoadingStatus);
  const analyzes = useSelector(selectAnalyzesData);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [analyzeTypes, setAnalyzeTypes] = useState<Analyze[]>([]);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  useEffect(() => {
    dispatch(fetchUserDataById(userId));
    dispatch(fetchProgressData(userId));
    dispatch(fetchAnalyzesData(userId));
    dispatch(fetchGoalsDataById(userId));
    dispatch(fetchRecommendationsData(userId));

    const fetchAnswers = () => {
      UserService.answers(userId).then(({ data }) => setAnswers(data));
    };
    function fetchAllTypes() {
      AnalyzeService.geAllTypes().then(({ data }) => setAnalyzeTypes(data));
    }
    fetchAllTypes();
    fetchAnswers();
  }, [dispatch, userId]);

  function onAddComment(comment: string, analyzeId: number) {
    const data = {
      text: comment,
      analyzeAnswerId: analyzeId,
    };

    setIsLoadingComment(true);

    AnalyzeService.addComment(data)
      .then(() => {
        dispatch(fetchAnalyzesData(userId));
        setIsLoadingComment(false);
      })
      .catch(() => {
        setIsLoadingComment(false);
        eventBus.emit(EventTypes.notification, {
          message: 'Произошла ошибка, попробуйте еще раз!',
          type: NotificationType.DANGER,
        });
      });

    eventBus.emit(EventTypes.notification, {
      message: 'Комментарий добавлен!',
      type: NotificationType.SUCCESS,
    });
  }

  function onDeleteComment(id: number) {
    setIsLoadingComment(true);

    AnalyzeService.deleteComment({ id })
      .then(() => {
        dispatch(fetchAnalyzesData(userId));
        setIsLoadingComment(false);
        eventBus.emit(EventTypes.notification, {
          message: 'Комментарий удален',
          type: NotificationType.SUCCESS,
        });
      })
      .catch(() => {
        setIsLoadingComment(false);
        eventBus.emit(EventTypes.notification, {
          message: 'Произошла ошибка, попробуйте еще раз!',
          type: NotificationType.DANGER,
        });
      });
  }

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <Profile
      user={user}
      onDeleteComment={onDeleteComment}
      isLoadingComment={isLoadingComment}
      onAddComment={onAddComment}
      progress={progress}
      progressLoadingStatus={progressLoadingStatus}
      goalsLength={goalsLength}
      recommendations={recommendations}
      questionnaireAnswers={answers}
      analyzeTypes={analyzeTypes}
      analyzes={analyzes}
    />
  );
};
