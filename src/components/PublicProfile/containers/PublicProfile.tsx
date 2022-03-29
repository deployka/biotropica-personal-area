import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnalyzeService from '../../../services/AnalyzeService';
import UserService from '../../../services/UserService';
import { Analyze } from '../../../store/ducks/analyze/contracts/state';
import { fetchAnalyzesData } from '../../../store/ducks/analyzes/actionCreators';
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
import { Profile } from './Profile';

type Props = {
  userId: number;
};

export const PublicProfile = ({ userId }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const progress = useSelector(selectProgressData);
  const goalsLength = useSelector(selectGoalsData).length;
  const recommendations = useSelector(selectSortedRecommendationsData);
  const progressLoadingStatus = useSelector(selectProgressLoadingStatus);
  const analyzes = useSelector(selectAnalyzesData);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [analyzeTypes, setAnalyzeTypes] = useState<Analyze[]>([]);

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

  if (!user || !progress?.length) {
    return <div>Загрузка...</div>;
  }

  return (
    <Profile
      user={user}
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
