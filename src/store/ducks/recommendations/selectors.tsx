import { RootState } from '../../store';
import {
  Recommendation,
  RecommendationType,
} from '../recommendation/contracts/state';
import { RecommendationsState } from './contracts/state';

export type SortedRecommendations = Record<
  RecommendationType,
  Record<string, Recommendation[]>
>;

export const selectRecommendationsState = (
  state: RootState
): RecommendationsState => state.recommendations;

export const selectRecommendationsData = (
  state: RootState
): RecommendationsState['recommendations'] =>
  selectRecommendationsState(state).recommendations;

export const selectSortedRecommendationsData = (state: RootState) => {
  // const recommendations = Array.from(selectRecommendationsData(state));
  const recommendations: Recommendation[] = [
    {
      id: 1,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Татьяновна',
        position: 'ТРЕНИРОВКИ',
        profile_photo: '',
      },
      title: 'Отожмитесь 5000 раз',
      description: '',
      createdAt: '2021-04-07',
    },
    {
      id: 2,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Татьяновна',
        position: 'ТРЕНИРОВКИ',
        profile_photo: '',
      },
      title: 'Отожмитесь 5000 раз',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2021-04-07',
    },
    {
      id: 3,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Татьяновна',
        position: 'ТРЕНИРОВКИ',
        profile_photo: '',
      },
      title: 'Отожмитесь 5000 раз',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2021-04-07',
    },
    {
      id: 4,
      type: RecommendationType.NUTRITION,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Татьяновна',
        position: 'ПИТАНИЕ',
        profile_photo: '',
      },
      title: 'супер пупер',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2021-01-10',
    },
    {
      id: 5,
      type: RecommendationType.NUTRITION,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Татьяновна',
        position: 'ПИТАНИЕ',
        profile_photo: '',
      },
      title: 'Сегодня с 23:00 до 05:00',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2021-02-10',
    },
    {
      id: 6,
      type: RecommendationType.NUTRITION,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Татьяновна',
        position: 'ПИТАНИЕ',
        profile_photo: '',
      },
      title: 'Сегодня с 23:00 до 05:00',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2021-04-10',
    },
    {
      id: 7,
      type: RecommendationType.NUTRITION,
      specialist_profile: {
        id: 4364,
        name: 'Владилен Минин',
        position: 'ПИТАНИЕ',
        profile_photo: '',
      },
      title: 'пропитание',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2018-06-01',
    },
    {
      id: 8,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 333,
        name: 'Александр Невский',
        position: 'ТРЕНИРОВКИ',
        profile_photo: '',
      },
      title: 'тренька',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.
      Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.
      Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.
      
      Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2020-03-04',
    },
    {
      id: 9,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 333,
        name: 'Александр Невский',
        position: 'ТРЕНИРОВКИ',
        profile_photo: '',
      },
      title: 'тренька',
      description: `Сегодня с 23:00 до 05:00 со спутника лазером будут замерять
      температуру у населения(ректально). Просьба высунуть жопу в открытое
      окно по направлению к звёздам. в правой руке держать открытый
      паспорт.`,
      createdAt: '2020-03-04',
    },
  ];

  const rec = recommendations.reduce((acc, rec: Recommendation) => {
    if (!acc[rec.type]) {
      acc[rec.type] = {};
    }
    if (!acc[rec.type][rec.specialist_profile.id]) {
      acc[rec.type][rec.specialist_profile.id] = [];
    }
    acc[rec.type][rec.specialist_profile.id].push(rec);
    return acc;
  }, {} as SortedRecommendations);
  return rec;
};

export const selectRecommendationsResponse = (
  state: RootState
): RecommendationsState['response'] =>
  selectRecommendationsState(state).response;

export const selectRecommendationsStatus = (
  state: RootState
): RecommendationsState['status'] => selectRecommendationsState(state).status;

export const selectRecommendationsLoadingStatus = (state: RootState): string =>
  selectRecommendationsState(state).status;
