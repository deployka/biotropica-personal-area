import React, { useState } from 'react';

import { SpecialistTable } from './SpecialistTable';
import { BaseUser } from '../../../../@types/entities/BaseUser';
import { Filter } from '../../../../components/Filter/Filter';
import {
  filterSpecialistByQuestionnaire,
  filterSpecialistByQuery,
  filterSpecialistByWard,
  specialistFilters,
} from './specialistHelper';
import { useGetCurrentSpecialistQuery } from '../../../../api/specialists';

import s from '../../Specialists.module.scss';
import { Filters } from '../../UsersSpecialists';
import SearchInput from '../../../../components/SearchInput/SearchInput';

type Props = {
  specialists: BaseUser[];
  filters: Filters;
  isLoading?: boolean;
  setFilters: (filters: Filters) => void;
};

export function SpecialistList({
  specialists,
  isLoading = false,
  filters,
  setFilters,
}: Props) {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const { data: currentSpecialist } = useGetCurrentSpecialistQuery();

  const currentSpecialistId = currentSpecialist?.user?.id || 0;

  let filteredSpecialist = specialists.filter(
    specialist =>
      filterSpecialistByWard(specialist, filters.ward, currentSpecialistId) &&
      filterSpecialistByQuestionnaire(specialist, filters.questionnaire[0]),
  );

  if (query) {
    filteredSpecialist = filterSpecialistByQuery(filteredSpecialist, query);
  }

  return (
    <div className={s.adminPanel}>
      <Filter
        isHidden={!isFilterOpened}
        onClose={() => {
          setIsFilterOpened(false);
        }}
        filters={specialistFilters}
        selectedFilters={filters}
        onChange={(filters: Filters) => setFilters(filters)}
      />
      <div className={[s.listPanel, s.full].join(' ')}>
        <div className={s.titleLine}>
          <div className={s.title}>
            <h3>Все специалисты</h3>
            <div className={s.counter}>
              <p>{filteredSpecialist.length}</p>
            </div>
          </div>
        <div className={s.options}>
          <div className={s.searchInput}>
            <SearchInput value={query} onChange={setQuery} placeholder="Поиск" />
          </div>
        </div>
      </div>

        {isLoading && <p className={s.empty}>Загрузка списка специалистов</p>}
        {!isLoading && !filteredSpecialist.length && (
          <p className={s.empty}>Специалисты не найдены</p>
        )}
        {!isLoading && <SpecialistTable users={filteredSpecialist} />}
      </div>
    </div>
  );
}
