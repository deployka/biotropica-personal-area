import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from '../../../shared/Global/Calendar/Calendar';
import { Goal } from '../../../store/ducks/goal/contracts/state';
import { selectGoalData } from '../../../store/ducks/goal/selectors';
import { Tab, Tabs } from './../../../shared/Global/Tabs/Tabs';
import { Dates } from './Goals';

import s from './Goals.module.scss';

interface Props {
  setDates: Dispatch<SetStateAction<Dates>>;
  setGraphDates: Dispatch<SetStateAction<Dates>>;
  dates: Dates;
}

export const GraphHeader = ({ setDates, dates, setGraphDates }: Props) => {
  const goal: Goal | undefined = useSelector(selectGoalData);
  const tabs: Tab[] = [
    {
      key: 'week',
      value: 'Неделя',
    },
    {
      key: 'month',
      value: 'Месяц',
    },
    {
      key: 'year',
      value: 'Год',
    },
  ];

  function getStartDate() {
    const currentDate = new Date();
    switch (activeTab) {
      case 'week':
        currentDate.setDate(new Date().getDate() - 7);
        break;
      case 'month':
        currentDate.setDate(new Date().getDate() - 30);
        break;
      case 'year':
        currentDate.setDate(new Date().getDate() - 360);
        break;
      default:
        currentDate.setDate(new Date().getDate() - 7);
        break;
    }
    return currentDate;
  }

  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  useEffect(() => {
    if (activeTab === 'off') {
      return;
    }
    setDates({ startDate: getStartDate(), endDate: new Date() });
  }, [activeTab]);

  return (
    <>
      {goal && (
        <div className={s.graph__header}>
          <div className={s.goal__info}>
            <div className={s.goal__title}>{goal.name}</div>
            <div className={s.goal__description}>
              {goal.description || <br />}
            </div>
          </div>
          <div className={s.graph__period__selectors}>
            <div className={s.tabs}>
              <Tabs
                activeTab={activeTab}
                onActiveTabChanged={setActiveTab}
                tabs={tabs}
                spaceBetween={30}
              />
            </div>
            <div className={s.btn__calendar}>
              <Calendar
                setActiveTab={setActiveTab}
                setGraphDates={setGraphDates}
                startDate={dates.startDate}
                endDate={dates.endDate}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
