import React from 'react';
import s from './Tabs.module.scss';
import classNames from 'classnames';

export type TabsProps<T extends string> = {
  value: T;
  options: {
    value: T;
    label: string;
    withNotify?: boolean;
  }[];
  onSelect(value: T): void;
};

export function Tabs<T extends string>(props: TabsProps<T>) {
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
              it.withNotify ? s.with_notify : ''
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
