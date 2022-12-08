import { BaseUser } from '../../../../@types/entities/BaseUser';
import { FilterField } from '../../../../components/Filter/Filter';
import user from '../../../../store/slices/user';

export const usersFilters: FilterField[] = [
  {
    name: 'Рекомендация',
    key: 'waitingForRecommendation',
    type: 'radio',
    filters: [
      {
        value: 'no',
        label: 'Не ожидают',
      },
      {
        value: 'yes',
        label: 'Ожидают',
      },
    ],
  },
  {
    name: 'Анализы',
    key: 'analyzes',
    type: 'radio',
    filters: [
      {
        value: 'all',
        label: 'Все',
      },
      {
        value: 'loaded',
        label: 'Загружены',
      },
      {
        value: 'notLoaded',
        label: 'Не загружены',
      },
    ],
  },
  {
    name: 'Подопечные',
    key: 'ward',
    type: 'radio',
    filters: [
      {
        value: 'all',
        label: 'Все',
      },
      {
        value: 'yes',
        label: 'Да',
      },
      {
        value: 'no',
        label: 'Нет',
      },
    ],
  },
];

export function filterUsersByQuery(users: BaseUser[], q: string) {
  const query = q.toLowerCase().trim();
  return users.filter(user => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.lastname?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}

export function filterUsersByWard(users: BaseUser, wards: string[], specialistId: number) {
  const ward = wards[0];
  if (ward === 'all' || !ward) {
    return users;
  }
  if (users.specialistId === specialistId) {
    console.log('users.specialistId');
    console.log(users);
    console.log('specialistId');
    console.log(specialistId);
  }
  if (ward === 'yes') {
    if (users.specialistId === specialistId) {
      return users.specialistId;
    }
  } else {
    return !users.specialistId;
  }
}

export function filterUsersByWaiting(users: BaseUser[], q: string) {
  const query = q.toLowerCase().trim();
  return users.filter(user => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.lastname?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}

export const analyzePassedStatus: Record<string, boolean | undefined> = {
  loaded: true,
  notLoaded: false,
  all: undefined,
};
