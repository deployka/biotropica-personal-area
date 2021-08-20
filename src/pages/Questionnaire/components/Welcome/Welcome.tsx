import s from './Welcome.module.scss';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
interface Props {}
export const Welcome = (props: Props) => {
  return (
    <div className={s.welcome}>
      <div className={s.welcome__content}>
        <div className={s.welcome__logo__wrapper}>
          <GlobalSvgSelector id="logo" />
        </div>
        <h2 className={s.welcome__title}>Добро пожаловать в BioTropika</h2>
        <p className={s.welcome__subtitle}>
          Ответь на наши вопросы для корректного формирования вашего рациона и
          тренировок{' '}
        </p>
        <button className={s.btn__start}>Начать</button>
      </div>
    </div>
  );
};
