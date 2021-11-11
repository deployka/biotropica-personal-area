import React from 'react';
import { Link } from 'react-router-dom';

import s from './ErrorPage.module.scss';

import { ErrorSvgSelector } from './../../../assets/icons/error/ErrorSvgSelector';

const ErrorPage = () => {
  return (
    <div className={s.errorPage}>
      <div className={s.img}>
        <ErrorSvgSelector id={'illustration'}></ErrorSvgSelector>
      </div>
      <div className={s.content}>
        <div className={s.title}>
          <h2>Упс... Такой страницы нет</h2>
        </div>
        <div className={s.text}>
          <p>
            Вы зашли на несуществующую страницу.
            <br /> Вернитесь на <Link to="/">главную</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
