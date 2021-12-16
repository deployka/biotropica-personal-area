import { RootState } from '../../store';
import {
  Recommendation,
  RecommendationType,
} from '../recommendation/contracts/state';
import { SpecializationName } from '../specialist/contracts/state';
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
        name: 'Татьяна Алексеевна',
        position: SpecializationName.PHYSICIAN,
        profile_photo: '',
      },
      title: 'Делать зарядку',
      description: '',
      createdAt: '2021-04-07',
    },
    {
      id: 2,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Алексеевна',
        position: SpecializationName.PHYSICIAN,
        profile_photo: '',
      },
      title: 'Отжиматься',
      description: `Займите исходное положение на полу: плечи, спина, ягодицы, живот и ноги должны составлять одну линию.
      При выполнении упражнения необходимо двигаться из стороны в сторону.
      Руки необходимо расставить намного шире, чем при выполнении классических отжиманий.
      Перекатывайтесь на одну руку, выпрямив другую, и наоборот.`,
      createdAt: '2021-04-07',
    },
    {
      id: 3,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Алексеевна',
        position: SpecializationName.PHYSICIAN,
        profile_photo: '',
      },
      title: 'Подтягиваться',
      description: `Подтянитесь сколько сможете`,
      createdAt: '2021-04-07',
    },
    {
      id: 4,
      type: RecommendationType.NUTRITION,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Алексеевна',
        position: SpecializationName.NUTRITIONIST,
        profile_photo: '',
      },
      title: 'Кушайте кашу',
      description: `Чтобы набраться сил кушайте геркулес 2`,
      createdAt: '2021-01-10',
    },
    {
      id: 5,
      type: RecommendationType.NUTRITION,
      specialist_profile: {
        id: 124,
        name: 'Татьяна Алексеевна',
        position: SpecializationName.NUTRITIONIST,
        profile_photo: '',
      },
      title: 'Ешьте орехи',
      description: `Чтобы вырос большой мозг, нужно есть грецкий орех! (2 раза в день)`,
      createdAt: '2021-02-10',
    },
    {
      id: 7,
      type: RecommendationType.NUTRITION,
      specialist_profile: {
        id: 4364,
        name: 'Владилен Минин',
        position: SpecializationName.NUTRITSIOLOG,
        profile_photo: '',
      },
      title: 'Придерживайтесь диеты',
      description: `Чтобы сбросить вес кушайте по чуть-чуть 5 раз в день`,
      createdAt: '2018-06-01',
    },
    {
      id: 8,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 333,
        name: 'Александр Невский',
        position: SpecializationName.TRAINER,
        profile_photo: '',
      },
      title: 'Отжимания на брусьях',
      description: `Наклоните торс вперед, а затем медленно опуститесь между брусьями, сгибая руки в локтях. Важно сопротивляться гравитации на пути вниз, в противном случае, вы можете повредить грудную мышцу, в месте крепления ее к плечевой кости, или локтевой сустав.`,
      createdAt: '2020-03-04',
    },
    {
      id: 9,
      type: RecommendationType.WORKOUT,
      specialist_profile: {
        id: 333,
        name: 'Александр Невский',
        position: SpecializationName.TRAINER,
        profile_photo: '',
      },
      title: 'Приседания',
      description: `Приседа́ния — одно из базовых силовых упражнений (в том числе в пауэрлифтинге и культуризме); выполняющий упражнение приседает и затем встаёт, возвращаясь в положение стоя. Приседание считается одним из важнейших упражнений не только в силовом спорте, но и в общефизической подготовке, а также используется в качестве подсобного в процессе подготовки спортсменов практически всех спортивных дисциплин.`,
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
