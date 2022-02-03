import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Calendar } from '../../../shared/Global/Calendar/Calendar';
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

  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  function getStartDate() {
    const currentDate = new Date();
    switch (activeTab) {
      case 'week':
        currentDate.setDate(new Date().getDate() - 7);
        break;
      case 'month':
        currentDate.setDate(
          new Date().getDate() - moment(currentDate).daysInMonth() + 1,
        );
        break;
      case 'year':
        currentDate.setDate(
          new Date().getDate() - moment(currentDate).daysInMonth() * 12,
        );
        break;
      default:
        currentDate.setDate(new Date().getDate() - 7);
        break;
    }
    return currentDate;
  }

  useEffect(() => {
    if (activeTab === 'off') {
      return;
    }
    setDates({ startDate: getStartDate(), endDate: new Date() });
  }, [activeTab]);

  return (
    <>
      {goal && (
        <div className={s.helper}>
          <div className={s.info}>
            <div className={s.title}>
              <p>{goal.name}</p>
            </div>
            <div className={s.description}>
              <p>{goal.description || <br />}</p>
            </div>
          </div>
          <div className={s.selectors}>
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
