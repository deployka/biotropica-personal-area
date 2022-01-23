import { formatSpecializationsToString } from '../../../utils/specialistHelper';
import { RootState } from '../../store';
import { Specialist, SpecialistUser } from '../specialist/contracts/state';
import { SpecialistsState } from './contracts/state';

export const selectSpecialistsState = (state: RootState): SpecialistsState =>
  state.specialists;

export const selectSpecialistsData = (
  state: RootState,
): SpecialistsState['specialists'] => selectSpecialistsState(state).specialists;

export const selectSpecialistsResponse = (
  state: RootState,
): SpecialistsState['response'] => selectSpecialistsState(state).response;

export const selectFilteredSpecialistsData = (
  state: RootState,
): Specialist[] => {
  const specialists = Array.from(selectSpecialistsData(state));
  return specialists.reduce((acc: Specialist[], spec: SpecialistUser) => {
    const { user, ...res } = spec;
    acc.push({
      profilePhoto: user.profilePhoto,
      name: `${user.lastname || ''} ${user.name || ''} ${
        user.patronymic || ''
      }`,
      ...res,

      specializations:
        formatSpecializationsToString(res.specializations) ||
        'Нет специализаций',
      userId: user.id,
    });
    return acc;
  }, [] as Specialist[]);
};

export const selectSpecialistsStatus = (
  state: RootState,
): SpecialistsState['status'] => selectSpecialistsState(state).status;

export const selectSpecialistsLoadingStatus = (state: RootState): string =>
  selectSpecialistsState(state).status;
