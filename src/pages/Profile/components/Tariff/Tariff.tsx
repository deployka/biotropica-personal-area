import { Link } from 'react-router-dom';
import s from './Tariff.module.scss';
interface Props {
  Tariff: any; //TODO: Добавить интерфейс после добавления тарифов в редакс
}

export const Tariff = ({ Tariff }: Props) => {
  return (
    <Link style={{ textDecoration: 'none' }} to="/tariffs">
      <div className={s.tariff}>
        <div className={s.tariff__name}>
          Тариф {'  '}
          {Tariff.name}
        </div>
        <div className={s.tariff__expires}>
          до {'  '}
          {Tariff.expires}
        </div>
      </div>
    </Link>
  );
};
