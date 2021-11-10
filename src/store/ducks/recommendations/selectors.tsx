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

export const selectSortedData = (state: RootState) => {
  // const recommendations = Array.from(selectRecommendationsData(state));
  const recommendations = [
  {
    id: 1,
    type: RecommendationType.WORKOUT,
    specialist_profile: {
      id: 124,
      name: 'Татьяна Татьяновна',
      position: 'ТРЕНИРОВКИ',
      profile_photo: '',
    },
    content: (
      <div >
        <p >Отожмитесь 5000 раз</p>
      </div>
    ),
    createdAt: '2021-04-07',
  },
  {
    id: 2,
    type: RecommendationType.NUTRITION,
    specialist_profile: {
      id: 124,
      name: 'Татьяна Татьяновна',
      position: 'ПИТАНИЕ',
      profile_photo: '',
    },
    content: (
      <div >
        <p >Сожрите мощный бургер</p>
      </div>
    ),
    createdAt: '2021-26-10',
  },
    {
    id: 2,
    type: RecommendationType.NUTRITION,
    specialist_profile: {
      id: 124,
      name: 'Татьяна Татьяновна',
      position: 'ПИТАНИЕ',
      profile_photo: '',
    },
    content: (
      <div >
        <p >Сожрите мощный бургер</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, cum omnis! Illum reiciendis ea ab deleniti nobis ratione vitae at, aperiam repellat similique nostrum est ipsa perspiciatis quisquam, laboriosam earum pariatur ullam modi minus debitis dolores omnis neque vero sunt. Quis tempora voluptatum labore sit repudiandae iste quod est eum?
      </div>
    ),
    createdAt: '2021-26-10',
  },
  {
    id: 2,
    type: RecommendationType.NUTRITION,
    specialist_profile: {
      id: 124,
      name: 'Татьяна Татьяновна',
      position: 'ПИТАНИЕ',
      profile_photo: '',
    },
    content: (
      <div >
        <p >Сожрите мощный бургер</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, cum omnis! Illum reiciendis ea ab deleniti nobis ratione vitae at, aperiam repellat similique nostrum est ipsa perspiciatis quisquam, laboriosam earum pariatur ullam modi minus debitis dolores omnis neque vero sunt. Quis tempora voluptatum labore sit repudiandae iste quod est eum?
      </div>
    ),
    createdAt: '2021-26-10',
  },
  {
    id: 2,
    type: RecommendationType.NUTRITION,
    specialist_profile: {
      id: 124,
      name: 'Татьяна Татьяновна',
      position: 'ПИТАНИЕ',
      profile_photo: '',
    },
    content: (
      <div >
        <p >Сожрите мощный бургер</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, cum omnis! Illum reiciendis ea ab deleniti nobis ratione vitae at, aperiam repellat similique nostrum est ipsa perspiciatis quisquam, laboriosam earum pariatur ullam modi minus debitis dolores omnis neque vero sunt. Quis tempora voluptatum labore sit repudiandae iste quod est eum?
      </div>
    ),
    createdAt: '2021-26-10',
  },
  {
    id: 2,
    type: RecommendationType.NUTRITION,
    specialist_profile: {
      id: 124,
      name: 'Татьяна Татьяновна',
      position: 'ПИТАНИЕ',
      profile_photo: '',
    },
    content: (
      <div >
        <p >Сожрите мощный бургер</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, cum omnis! Illum reiciendis ea ab deleniti nobis ratione vitae at, aperiam repellat similique nostrum est ipsa perspiciatis quisquam, laboriosam earum pariatur ullam modi minus debitis dolores omnis neque vero sunt. Quis tempora voluptatum labore sit repudiandae iste quod est eum?
      </div>
    ),
    createdAt: '2021-26-10',
  },
  
  {
    id: 3,
    type: RecommendationType.NUTRITION,
    specialist_profile: {
      id: 4364,
      name: 'Владилен Минин',
      position: 'ПИТАНИЕ',
      profile_photo: '',
    },
    content: (
      <div >
        <p >Не ешьте ничего 50 дней</p>
        Lorem
      </div>
    ),
    createdAt: '2018-12-01',
  },
  {
    id: 4,
    type: RecommendationType.WORKOUT,
    specialist_profile: {
      id: 333,
      name: 'Александр Невский',
      position: 'ТРЕНИРОВКИ',
      profile_photo: '',
    },
    content: (
      <div >
        <p>Сегодня с 23:00 до 05:00 со спутника лазером будут замерять температуру у населения(ректально). Просьба высунуть жопу в открытое окно по направлению к звёздам. в правой руке держать открытый паспорт.</p>
      </div>
    ),
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
