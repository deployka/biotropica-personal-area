import React, { Dispatch, SetStateAction } from 'react';

import classNames from 'classnames';

import s from './Tabs.module.scss';

export interface Tab {
  key: string;
  value: string;
}
interface Props {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  spaceBetween?: number;
}

export function getTabByKey(key: string, tabs: Tab[]) {
  return tabs.find(tab => tab.key === key);
}

export const Tabs = ({
  tabs,
  activeTab,
  setActiveTab,
  spaceBetween,
}: Props) => {
  function handleClick(tab: Tab) {
    setActiveTab(tab.key);
  }
  return (
    <div className={s.tabs} style={{ columnGap: spaceBetween || 40 }}>
      {tabs.map((tab: Tab) => (
        <div
          onClick={() => handleClick(tab)}
          key={tab.key}
          className={classNames({
            [s.tab]: true,
            [s.active]: activeTab === tab.key,
          })}
        >
          <p>{tab.value}</p>
        </div>
      ))}
    </div>
  );
};
