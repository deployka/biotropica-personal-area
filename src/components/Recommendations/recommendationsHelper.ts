import { Recommendation } from '../../@types/entities/Recommendation';
import { Specialization } from '../../@types/entities/Specialization';
import { SpecializationListProps } from '../Specialization/List/List';

type SpecializationRecommendations = Partial<
  Record<Specialization['key'], Recommendation[]>
>;

export function groupRecommendationsBySpecialization(
  recommendations: Recommendation[],
  specializations: Specialization[],
) {
  return specializations.reduce<SpecializationRecommendations>((acc, spec) => {
    acc[spec.key] = recommendations.filter(
      rec => rec.specialization.key === spec.key,
    );
    return acc;
  }, {});
}

export function getSpecializationTypes(
  specializations: Specialization[],
  recommendationsGroups: SpecializationRecommendations,
  canCreate: boolean,
) {
  return specializations.reduce<SpecializationListProps['types']>(
    (acc, specialization) => {
      if (!canCreate) return acc;
      acc.push({
        specialization,
        count: recommendationsGroups[specialization.key]?.length || 0,
      });
      return acc;
    },
    [],
  );
}
