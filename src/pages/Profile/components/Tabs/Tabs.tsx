import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Tab } from '../../pages/Edit/container/Edit';

import s from './Tabs.module.scss';

interface Props {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  function handleClick(tab: Tab) {
    setActiveTab(tab.key);
  }

  return (
    <div className={s.tabs}>
      {tabs.map((tab: Tab) => (
        <div
          onClick={() => handleClick(tab)}
          key={tab.key}
          className={classNames({
            [s.tab]: true,
            [s.active]: activeTab === tab.key,
          })}
        >
          {tab.value}
        </div>
      ))}
    </div>
  );
};
