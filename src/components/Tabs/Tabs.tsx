import React from 'react';
import s from './Tabs.module.scss';
import classNames from 'classnames';

export type TabsProps = {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onSelect(value: string): void;
};

export function Tabs(props: TabsProps) {
  return (
    <div className={s.center}>
      <div className={s.toggleButtons}>
        {props.options.map(it => (
          <button
            key={`tab_btn_${it.value}`}
            onClick={() => props.onSelect(it.value)}
            className={classNames(
              s.toggleButton,
              it.value === props.value ? s.active : '',
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
