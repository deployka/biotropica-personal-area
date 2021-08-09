import s from './Tariff.module.scss';
interface Props {
  Tariff: any;
}

export const Tariff = ({ Tariff }: Props) => {
  return (
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
  );
};
