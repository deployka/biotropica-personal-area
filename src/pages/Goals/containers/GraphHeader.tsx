import classNames from 'classnames';
import moment from 'moment';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { DateContext } from '../../../context/DatesContext';
import { Calendar, Dates } from '../../../shared/Global/Calendar/Calendar';
import { Goal } from '../../../store/ducks/goal/contracts/state';
import { selectGoalData } from '../../../store/ducks/goal/selectors';
import { compareDate } from '../../../utils/compareDate';
import { Tabs } from '../../Profile/components/Tabs/Tabs';
import { Tab } from '../../Profile/pages/Edit/container/Edit';

import s from './Goals.module.scss';

interface Props {}

export const GraphHeader = ({}: Props) => {
  const goal: Goal | undefined = useSelector(selectGoalData);
  const { setDates, dates } = useContext(DateContext);

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

  function getEndDate() {
    const currentDate = new Date();
    switch (activeTab) {
      case 'month':
        currentDate.setDate(currentDate.getDate() + 30);
        break;
      case 'week':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'year':
        currentDate.setDate(currentDate.getDate() + 360);
        break;
      default:
        currentDate.setDate(currentDate.getDate() + 7);
        break;
    }
    return currentDate;
  }

  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  useEffect(() => {
    setDates({ startDate: new Date(), endDate: getEndDate() });
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
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
            />
            <div className={s.btn__calendar}>
              <Calendar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
