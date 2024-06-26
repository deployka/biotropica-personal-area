import React, { ReactNode } from 'react';

import classNames from 'classnames';

import s from './Tabs.module.scss';

export interface Tab {
  key: string;
  value: ReactNode;
  isHidden?: boolean;
}
interface Props {
  tabs: Tab[];
  activeTab: string;
  onActiveTabChanged: (activeTab: string) => void;
  spaceBetween?: number;
  onTabClick?: (tab: Tab) => void;
}

export const Tabs = ({
  tabs,
  activeTab,
  onActiveTabChanged,
  spaceBetween,
  onTabClick,
}: Props) => {
  function handleClick(tab: Tab) {
    onTabClick && onTabClick(tab);
    onActiveTabChanged(tab.key);
  }
  return (
    <div className={s.tabs}>
      {tabs.map(
        (tab: Tab) =>
          !tab.isHidden && (
            <div
              onClick={() => handleClick(tab)}
              key={tab.key}
              className={classNames(s.tab, {
                [s.active]: activeTab === tab.key,
              })}
            >
              <p>{tab.value}</p>
            </div>
          ),
      )}
    </div>
  );
};
