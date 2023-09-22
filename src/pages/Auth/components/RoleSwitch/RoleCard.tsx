import React, { useState } from 'react';
import s from './RoleSwitch.module.scss';

type RoleCardType = {
  Logo: React.ReactElement;
  title: string;
  onClick?: () => void;
};

export const RoleCard = ({ Logo, title, onClick }: RoleCardType) => {
  const [hover, setHover] = useState(false);

  const getClassName = (className: string) => {
    return className + (hover ? ' ' + s.hover : '');
  };

  return (
    <div
      className={getClassName(s.cardContainer)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div className={getClassName(s.logoContainer)}>
        <div className={getClassName(s.logoCircle)}>
          {React.cloneElement(Logo, { className: getClassName(s.logo) })}
        </div>
      </div>
      <div className={getClassName(s.titleContainer)}>{title}</div>
    </div>
  );
};
